#!/bin/bash
set -e  # Exit on error

# Load environment variables
set -a
[[ -f /app/.env ]] && source /app/.env
set +a

# Print environment variables for debugging (excluding sensitive data)
echo "Environment variables loaded:"
env | grep -v 'KEY\|SECRET\|PASSWORD'

# Setup nginx
echo "Setting up Nginx..."
mkdir -p /run/nginx
chown -R www-data:www-data /run/nginx /var/log/nginx /var/lib/nginx
chmod -R 755 /run/nginx /var/log/nginx /var/lib/nginx

# Start Nginx
echo "Starting Nginx..."
nginx -g 'daemon off;' &

# Navigate to server directory
cd /app/server

# Create necessary directories with proper permissions
echo "Creating necessary directories..."
mkdir -p staticfiles mediafiles
chown -R www-data:www-data staticfiles mediafiles
chmod 755 staticfiles mediafiles

# Setup database directory and permissions
echo "Setting up database..."
cd /app/server
mkdir -p data
touch data/db.sqlite3
chown -R www-data:www-data data
chmod -R 777 data

# Apply database migrations
echo "Applying database migrations..."
DJANGO_SETTINGS_MODULE=core.settings python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
DJANGO_SETTINGS_MODULE=core.settings python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --access-logfile - --error-logfile -
