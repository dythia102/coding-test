ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "cd coding-test && git pull origin main"
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "cd coding-test && docker compose -f docker-compose.devops.yml up --build -d"

