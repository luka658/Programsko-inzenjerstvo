FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (they MUST be in root!)
COPY requirements.txt /app/

# Install dependencies
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy Django backend project
COPY backend/ /app/backend/

# Set working dir where manage.py lives
WORKDIR /app/backend

# Expose port
EXPOSE 8000

# Run Django via gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
[02:24, 15. 11. 2025.] Renato Dolic: to commitat treba
