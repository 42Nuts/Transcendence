#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    bin/elasticsearch-create-enrollment-token -s kibana > ./token && \
    bin/elasticsearch-reset-password -u $ELASTICSEARCH_USER -i < ./password && \
    cat /usr/share/elasticsearch/config/certs/http_ca.crt > /usr/share/elasticsearch/http_ca.crt && \
    hostname > /usr/share/elasticsearch/hostname && \
    touch /tmp/isOk; \
fi
