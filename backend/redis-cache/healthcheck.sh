#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    redis-cli -h $REDIS_CACHE_HOST -p $REDIS_CACHE_PORT ping && \
    touch /tmp/isOk;
fi
