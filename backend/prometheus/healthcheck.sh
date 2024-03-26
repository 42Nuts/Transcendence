#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    curl -k --fail https://$PROMETHEUS_HOST:$PROMETHEUS_PORT/-/healthy && \
    touch /tmp/isOk; \
fi
