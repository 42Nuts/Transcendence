#!/bin/sh

./manage.py makemigrations \
    users \
    matches \
    relationships \
    login
./manage.py migrate

mkdir -p logs
touch logs/log.log

touch $DJANGO_HEALTH

# gunicorn config.wsgi --bind $DJANGO_IP:$DJANGO_PORT #--workers=1 --threads=2 --worker-class=gthread
daphne config.asgi:application --bind $DJANGO_IP --port $DJANGO_PORT #--workers=1 --threads=2 --worker-class=gthread

