#!/bin/bash
# echo run this from root git folder

docker run -it -p 3000:3000 \
    -v "$PWD/frontend:/app" \
    -w /app node:18-alpine sh 