docker buildx build \
  --platform linux/arm64 \
  -t dythia102/sales-ai-frontend:latest \
  --push \
  ./frontend