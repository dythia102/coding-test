# **Work Logs** 
launch and configure an **EC2 instance using AWS CLI**
---

## ✅ Step-by-step EC2 Setup via AWS CLI
### **0. Prerequisites**
- [x] AWS CLI installed (`aws --version`)
- [x] Run `aws configure` with your:
  - `AWS Access Key ID`
  - `AWS Secret Access Key`
  - `Default region name` (e.g., `ap-southeast-1`)
  - `Default output format` (e.g., `json`)
  #### Verification 
  ```bash
    aws --version        # Should return aws-cli version
    aws configure list   # Should show your configured Access Key, Region, etc.
  ```
---

### **1. Choose an AMI**
Use Amazon Linux 2023 with ARM Arch, for price peformance:
  ```bash
  aws ec2 describe-images \
    --owners amazon \
    --filters "Name=name,Values=al2023-ami-*" \
              "Name=architecture,Values=arm64" \
              "Name=virtualization-type,Values=hvm" \
              "Name=root-device-type,Values=ebs" \
    --region ap-southeast-1 \
    --query "sort_by(Images, &CreationDate)[::-1].[ImageId, Name, CreationDate]" \
    --output table
  ```
  will using this image
  - ami-0d47fa2c431cf6d45
  - al2023-ami-ecs-hvm-2023.0.20250430-kernel-6.1-arm64
  - 2025-04-30T21:27:09.000Z
---

### **2. Create a Key Pair (for SSH access)**
```bash
aws ec2 create-key-pair --key-name aws-interopera --query 'KeyMaterial' --output text > aws-interopera.awskeypair.pem
chmod 400 aws-interopera.awskeypair.pem
```
#### Verification:
  ```bash
  aws ec2 describe-key-pairs --query "KeyPairs[*].KeyName" --output table
  ```
---

### **3. Create a Security Group**
  ```bash
  aws ec2 create-security-group --group-name aws-interopera-secgroup --description "Allow SSH and web traffic"
  ```
#### Verification:
  ```bash
  aws ec2 describe-security-groups \
  --region ap-southeast-1 \
  --query "SecurityGroups[*].[GroupName, GroupId, Description]" \
  --output table
  ```
---
### **4. Allow Ports (SSH, HTTP, HTTPS, custom)**
```bash
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 8000 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 3000 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 9000 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 8080 --cidr 0.0.0.0/0
# Swarm cluster management (TCP 2377, restricted to security group)
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 2377 --source-group aws-interopera-secgroup
# Swarm node discovery (TCP 7946, restricted to security group)
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol tcp --port 7946 --source-group aws-interopera-secgroup
# Swarm node discovery (UDP 7946, restricted to security group)
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol udp --port 7946 --source-group aws-interopera-secgroup
# Swarm overlay network (UDP 4789, restricted to security group)
aws ec2 authorize-security-group-ingress --group-name aws-interopera-secgroup --protocol udp --port 4789 --source-group aws-interopera-secgroup

```
#### Verification:
```bash
  aws ec2 describe-security-groups \
    --group-names aws-interopera-secgroup \
    --region ap-southeast-1 \
    --query "SecurityGroups[*].IpPermissions[*].[IpProtocol,FromPort,ToPort,IpRanges[*].CidrIp]" \
    --output table

    aws ec2 describe-instances \
    --region ap-southeast-1 \
    --query "Reservations[].Instances[].[
        InstanceId,
        PrivateIpAddress,
        join(',', SecurityGroups[].GroupName)
    ]" \
    --output table
```

---
### **5. Launch the EC2 Instance**
   - t4g.micro: 1 vCPU, 1GB RAM
   - t4g.small: 2 vCPUs, 2GB RAM
   - t4g.medium: 2 vCPUs, 4GB RAM
   - t4g.large: 2 vCPUs, 8GB RAM 
   - t4g.xlarge: 4 vCPUs, 16GB RAM

```bash
aws ec2 run-instances --image-id ami-0d47fa2c431cf6d45 --count 1 --instance-type t4g.medium --key-name aws-interopera --security-groups aws-interopera-secgroup --region ap-southeast-1
```
#### Verification:
```bash
    aws ec2 describe-instances \
    --region ap-southeast-1 \
    --query "Reservations[*].Instances[*].[InstanceId, State.Name, PublicIpAddress]" \
    --output table
```

#### Public IP:
```bash
    aws ec2 describe-instances \
    --instance-ids i-085ae187d97a893f2 \
    --region ap-southeast-1 \
    --query "Reservations[*].Instances[*].PublicIpAddress" \
    --output text
```
---

### **6. Allocate and Associate Elastic IP (optional, for static IP)**
```bash
    aws ec2 allocate-address
    aws ec2 associate-address --instance-id i-085ae187d97a893f2 --allocation-id eipalloc-0e7cbc1babeffec97
```

```json
    {
        "AllocationId": "eipalloc-0e7cbc1babeffec97",
        "PublicIpv4Pool": "amazon",
        "NetworkBorderGroup": "ap-southeast-1",
        "Domain": "vpc",
        "PublicIp": "52.74.52.230"
    }
```

```json
    {
        "AssociationId": "eipassoc-08a6d4e387dee5aa9"
    }
```
---

### **8. SSH into your instance**
```bash
    ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230
```
```bash
    uname -a
```
    Linux ip-172-31-44-94.ap-southeast-1.compute.internal 6.1.132-147.221.amzn2023.aarch64 #1 SMP Tue Apr  8 13:14:35 UTC 2025 aarch64 aarch64 aarch64 GNU/Linux
---

### **9. Install Docker in instance**

```bash
    sudo dnf update -y
    sudo dnf install -y docker
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo usermod -aG docker ec2-user
    newgrp docker
    docker info
```

### **10. Give name to this instance**
```bash
    aws ec2 create-tags \
    --resources i-085ae187d97a893f2 \
    --tags Key=Name,Value=aws-interopera-devops \
    --region ap-southeast-1
```

```bash
    aws ec2 describe-instances \
    --instance-ids i-085ae187d97a893f2 \
    --query "Reservations[*].Instances[*].Tags" \
    --region ap-southeast-1 \
    --output table
```

### 11. Create application instance
```bash
    aws ec2 run-instances \
    --image-id ami-0d47fa2c431cf6d45 \
    --count 1 \
    --instance-type t4g.medium \
    --key-name aws-interopera \
    --security-groups aws-interopera-secgroup \
    --region ap-southeast-1 \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=aws-interopera01}]'
```

#### Assign EIP
```bash
    aws ec2 describe-addresses   --region ap-southeast-1   --query "Addresses[*].[PublicIp, AllocationId, InstanceId, AssociationId]"   --output table
```

```bash
    aws ec2 associate-address \
    --instance-id i-07ee93cab00f1a500 \
    --allocation-id eipalloc-088b8509f327eecf2 \
    --region ap-southeast-1
```

```bash
    aws ec2 create-tags \
    --resources i-07ee93cab00f1a500 \
    --tags Key=Name,Value=aws-interopera-apps \
    --region ap-southeast-1
```

```bash
    aws ec2 describe-instances \
    --instance-ids i-07ee93cab00f1a500 \
    --query "Reservations[*].Instances[*].Tags" \
    --region ap-southeast-1 \
    --output table
```

#### Get private IP Init Swarm manager on instance00
```bash
ip addr show 
docker swarm init --advertise-addr 172.31.44.94 

```bash
    docker swarm join --token SWMTKN-1-3jivpv8ixuuk6wu5m4nwduow107p8aa38ryzwinreuetmheytr-1evoaxj584k2v38apv6b0miyb 172.31.44.94:2377
```
## install Git on devop instance

```bash
    ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.76.218.70 "sudo dnf install -y git"
```

## Label docker swarms

```bash
docker node ls
docker node update --label-add name=worker1 <worker-node-id>
docker node inspect <worker-node-id>
```

## Label Login for image registry do on both instance create PAT 1st
docker login -u dythia102

TODO:
    fix all credential leaks
    vault, for secret processing
    jenkins job to clean up docker periodically