#!/bin/sh

echo "[wait] Waiting for ngrok API to be available on http://ngrok:4040..."

# Wait for ngrok's local API to become available and valid JSON
until curl -s http://ngrok:4040/api/tunnels | jq -e . >/dev/null 2>&1; do
  sleep 1
done

echo "[ok] ngrok API is up."

# Parse JSON with jq
JSON=$(curl -s http://ngrok:4040/api/tunnels)

FRONTEND_URL=$(echo "$JSON" | jq -r '.tunnels[] | select(.name=="frontend") | .public_url')
BACKEND_URL=$(echo "$JSON" | jq -r '.tunnels[] | select(.name=="backend") | .public_url')

# URL validation function
is_valid_url() {
  echo "$1" | grep -Eq '^https:\/\/[a-zA-Z0-9.-]+\.[a-z]{2,}(:[0-9]+)?$'
}

# Validate format of both URLs
if ! is_valid_url "$FRONTEND_URL"; then
  echo "❌ Invalid FRONTEND_URL: $FRONTEND_URL"
  exit 1
fi

if ! is_valid_url "$BACKEND_URL"; then
  echo "❌ Invalid BACKEND_URL: $BACKEND_URL"
  exit 1
fi

echo "[ok] Extracted valid ngrok URLs:"
echo " - NEXT_PUBLIC_NGROK_FRONTEND_URL=$FRONTEND_URL"
echo " - NGROK_BACKEND_URL=$BACKEND_URL"

# Write to .env
echo "FRONTEND_URL=$FRONTEND_URL" > /app/.ngrok.env
echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" >> /app/.ngrok.env
