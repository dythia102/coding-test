@!/bin/bash

set -e
set -x
ssh -i ~/.ssh/aws-interopera.awskeypair.pem ec2-user@52.76.218.70 "rm -rf coding-test && git clone https://github.com/dythia102/coding-test.git && pwd && ls -la"
