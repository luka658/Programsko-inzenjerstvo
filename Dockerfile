FROM python:3.11-slim

WORKDIR /app


COPY requirements.txt /app/

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY backend/ /app/backend/

WORKDIR /app/backend

EXPOSE 8000

CMD sh -c "gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT"
