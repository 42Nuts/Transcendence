#!/bin/sh

echo "
bind $REDIS_CACHE_HOST
port $REDIS_CACHE_PORT
protected-mode no
" > /etc/redis.conf

redis-server /etc/redis.conf