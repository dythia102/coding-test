docker buildx build \
  --platform linux/arm64 \
  -t dythia102/sales-ai-backend:latest \
  --push \
  ./backend