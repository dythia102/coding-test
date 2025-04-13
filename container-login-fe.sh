#!/bin/bash

docker run -it -p 3000:3000 \
    -v "./frontend:/app" \
    -v "./run-dev-fe.sh":/app/run-dev-fe.sh \
    -w /app node:18-alpine sh 