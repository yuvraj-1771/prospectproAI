#!/bin/bash
set -e  # Exit on error

# Load environment variables
set -a
source /app/.env
set +a

# Start Nginx
echo "Starting Nginx..."
service nginx start

# Navigate to server directory
cd /app/server

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Create necessary directories
mkdir -p staticfiles mediafiles

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --access-logfile - --error-logfile -
