FROM node:18-alpine
WORKDIR /app
# Install curl and jq
RUN apk add --no-cache curl jq
# Copy package files
COPY package.json package-lock.json* ./
RUN echo "NEXT_PUBLIC_API_URL=http://52.74.52.230:8000" > .env
# Install dependencies
RUN npm install
# Copy application code
# Build the application
COPY . .
RUN npm run build
# Run the production server
CMD ["npm", "run", "start"]