FROM python:3.11-slim

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache gcc musl-dev libffi-dev python3-dev

# Upgrade pip
RUN pip install --upgrade pip

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]