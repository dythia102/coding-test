docker run --net=host -it \
  -v ./ngrok.yml:/etc/ngrok.yml \
  ngrok/ngrok:latest start --all --config /etc/ngrok.yml
