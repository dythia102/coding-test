#!/bin/bash

docker run -it --rm \
  -v "$PWD/backend:/app" \
  -w /app \
  -p 8000:8000 \
  python:alpine sh -c "pip install -r requirements.txt && pytest tests"
