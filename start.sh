cd backend

python manage.py migrate

pip install -r requirements.txt

gunicorn backend.wsgi:application --bind 0.0.0.0:${PORT:-8000}
