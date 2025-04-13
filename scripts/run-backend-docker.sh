#!/bin/bash

docker run -it --rm \
  -v "$PWD/backend:/app" \
  -w /app \
  -p 8000:8000 \
  python:alpine sh -c "
    apk add --no-cache gcc musl-dev libffi-dev python3-dev && \
    pip install --upgrade pip && \
    pip install -r requirements.txt && \
    uvicorn main:app --host 0.0.0.0 --port 8000
  "
