FROM node:18-alpine
WORKDIR /app
COPY . .
# Install curl and jq
RUN apk add --no-cache curl jq
# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm install
# Copy application code
# Build the application
RUN npm run build
COPY . .
# Run the production server
CMD ["npm", "run", "start"]