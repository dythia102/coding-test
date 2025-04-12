#!/bin/bash

docker run -it --rm -v "$PWD/frontend:/app" -w /app -p 3000:3000 node:18-alpine sh
