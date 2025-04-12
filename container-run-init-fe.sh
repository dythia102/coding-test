#!/bin/bash

docker run -it -p 3000:3000 \
    -v "./frontend:/app" \
    -v "./run-init-fe.sh":/app/run-init-fe.sh \
    -w /app -p 3000:3000 node:18-alpine sh -c "sh run-init-fe.sh"
