# Use Python 3.11 as base image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=core.settings \
    DEBUG=True

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install development dependencies
RUN pip install --no-cache-dir \
    black \
    pylint \
    pytest \
    pytest-django \
    django-debug-toolbar \
    ipython

# Copy project files
COPY . .

# Create necessary directories
RUN mkdir -p /app/staticfiles /app/mediafiles

# Copy entrypoint script and make it executable
COPY --chmod=755 entrypoint.sh /app/entrypoint.sh

# Expose development port
EXPOSE 8000

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
