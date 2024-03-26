#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    pg_isready --dbname=$POSTGRES_DB --host=$POSTGRES_HOST --port=$POSTGRES_PORT --username=$POSTGRES_USER && \
    touch /tmp/isOk; \
fi
