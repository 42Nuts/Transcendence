#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    curl --fail http://$DJANGO_HOST:$DJANGO_PORT/health/ && \
    curl --fail http://$DJANGO_HOST:$WS_PORT/health/ && \
    touch /tmp/isOk; \
fi
