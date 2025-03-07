# Stage 1: Build React client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build Python server
FROM python:3.10-slim AS server-builder
WORKDIR /app/server
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY server/ ./
RUN python manage.py collectstatic --noinput

# Stage 3: Production image
FROM python:3.10-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    build-essential \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY server/requirements.txt /app/server/
RUN pip install --no-cache-dir -r /app/server/requirements.txt

# Create necessary directories
RUN mkdir -p /app/server/static /app/server/mediafiles /app/server/staticfiles /app/server/data /app/client/dist

# Copy built client files
COPY --from=client-builder /app/client/dist /app/client/dist

# Copy server files
COPY --from=server-builder /app/server /app/server

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Set proper permissions and create necessary directories
RUN mkdir -p /var/log/nginx /var/lib/nginx /run/nginx /etc/nginx/sites-enabled \
    && rm -f /etc/nginx/sites-enabled/default \
    && chown -R www-data:www-data /app \
    && chmod -R 755 /app \
    && chmod -R 777 /app/server/data \
    && chmod -R 755 /app/client/dist \
    && chown -R www-data:www-data /var/log/nginx \
    && chown -R www-data:www-data /var/lib/nginx \
    && chown -R www-data:www-data /run/nginx \
    && chown -R www-data:www-data /etc/nginx \
    && touch /var/log/nginx/error.log \
    && touch /var/log/nginx/access.log \
    && chown -R www-data:www-data /var/log/nginx \
    && chmod -R 755 /var/log/nginx \
    && chmod -R 755 /var/lib/nginx \
    && chmod -R 755 /run/nginx \
    && chmod -R 755 /etc/nginx

# Expose ports
EXPOSE 8000
EXPOSE 80

# Copy configuration files
COPY .env /app/.env
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /entrypoint.sh

# Set default environment variables
ENV DJANGO_SETTINGS_MODULE=core.settings \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Expose port
EXPOSE 8000

# Make entrypoint script executable
RUN chmod +x /entrypoint.sh

# Start the application
ENTRYPOINT ["/entrypoint.sh"]
