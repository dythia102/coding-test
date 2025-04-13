#!/bin/bash

docker run -it --rm \
  -v "$PWD/backend:/app" \
  -w /app \
  -p 8000:8000 \
  python:alpine sh
