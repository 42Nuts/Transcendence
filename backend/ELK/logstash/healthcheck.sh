#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    curl --fail http://$LOGSTASH_HOST:$LOGSTASH_PORT && \
    touch /tmp/isOk; \
fi
