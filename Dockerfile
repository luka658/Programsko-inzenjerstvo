# Dockerfile
FROM python:3.11-slim

WORKDIR /app/backend

COPY backend/ /app/backend/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
