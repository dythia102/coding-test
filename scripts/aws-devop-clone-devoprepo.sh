@!/bin/bash

set -e
set -x
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "rm -rf coding-test && git clone https://github.com/dythia102/coding-test.git && pwd && ls -la"
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "mkdir -p ~/.docker/cli-plugins"
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-aarch64 -o ~/.docker/cli-plugins/docker-compose"
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "chmod +x ~/.docker/cli-plugins/docker-compose"




