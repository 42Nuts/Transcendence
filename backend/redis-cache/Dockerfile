FROM alpine
RUN apk update && apk add \
    redis \
    && rm -rf /var/cache/apk/*

COPY ./redis-cache.sh /usr/local/bin/redis-cache.sh
COPY ./healthcheck.sh /usr/local/bin/healthcheck.sh

RUN chmod +x /usr/local/bin/redis-cache.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

ENTRYPOINT [ "redis-cache.sh" ]