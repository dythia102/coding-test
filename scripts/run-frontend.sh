#!/bin/bash

# Go to frontend directory
cd "$(dirname "$0")/../frontend" || exit 1

echo "📦 Installing frontend dependencies (if needed)..."
npm install

echo "🚀 Starting Next.js frontend..."
npm run dev
