docker compose -f docker-compose.devops.yml down -v
sudo rm -rf ./jenkins/jenkins_home/*
docker compose -f docker-compose.devops.yml up --build -d