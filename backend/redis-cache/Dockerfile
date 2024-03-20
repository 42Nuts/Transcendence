FROM alpine:3.17
RUN apk update && apk add \
    redis \
    && rm -rf /var/cache/apk/*

COPY ./redis.conf /etc/redis.conf
COPY ./redis-cache.sh /usr/local/bin/redis-cache.sh

RUN chmod +x /usr/local/bin/redis-cache.sh

ENTRYPOINT [ "redis-cache.sh" ]