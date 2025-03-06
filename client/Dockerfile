# Use Node.js LTS for development
FROM node:20

# Set working directory
WORKDIR /app

# Install development dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Environment variable for development
ENV NODE_ENV=development

# Expose Vite's default port
EXPOSE 5173

# Start the development server with hot-reloading
CMD ["npm", "run", "dev", "--", "--host"]
