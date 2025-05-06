@!/bin/bash

set -e
set -x
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.74.52.230 "rm -rf coding-test && git clone https://github.com/dythia102/coding-test.git && pwd && ls -la"





