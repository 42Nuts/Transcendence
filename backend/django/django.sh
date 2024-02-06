#!/bin/sh

./manage.py makemigrations \
    users \
    matches \
    relationships \
    login
./manage.py migrate

touch $DJANGO_HEALTH

gunicorn config.wsgi --bind $DJANGO_IP:$DJANGO_PORT
