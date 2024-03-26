#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    curl --fail -k https://$NGINX_HOST:$NGINX_PORT/metrics && \
    touch /tmp/isOk; \
fi
