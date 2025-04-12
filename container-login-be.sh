#!/bin/bash

docker run -it -p 8000:8000 \
    -v "./backend":/app \
    -v "./dummyData.json":/app/dummyData.json \
    -v "./run-dev-be.sh":/app/run-dev-be.sh \
    -w /app python:alpine sh