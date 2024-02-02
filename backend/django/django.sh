#!/bin/sh

./manage.py makemigrations \
    users \
    matches
./manage.py migrate

touch $DJANGO_HEALTH

gunicorn config.wsgi --bind $DJANGO_IP:$DJANGO_PORT
