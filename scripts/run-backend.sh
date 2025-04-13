#!/bin/bash
echo "Not Tested Yet, you might encounter error"


set -e  # exit on first error

# Resolve absolute path to backend folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"

echo "🚀 Starting FastAPI backend setup from: $PROJECT_ROOT"

# 1. Create virtual environment
if [ ! -d "$BACKEND_DIR/.venv" ]; then
  echo "📦 Creating virtual environment..."
  python3 -m venv "$BACKEND_DIR/.venv"
fi

# 2. Activate venv
source "$BACKEND_DIR/.venv/bin/activate"

# 3. Install dependencies
echo "📥 Installing Python dependencies..."
pip install --upgrade pip > /dev/null
pip install -r "$BACKEND_DIR/requirements.txt"

# 4. Ensure .env exists
if [ ! -f "$BACKEND_DIR/.env" ]; then
  echo "⚠️  No .env found. Copying from .env.production as fallback..."
  cp "$BACKEND_DIR/.env.production" "$BACKEND_DIR/.env"
fi

# 5. Start FastAPI
cd "$BACKEND_DIR"
echo "🌐 Starting FastAPI server at http://localhost:8000 ..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
