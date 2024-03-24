#!/usr/bin/env sh

if [ -f /tmp/isOk ]; then \
    exit 0; \
else \
    bin/elasticsearch-create-enrollment-token -s kibana > ./token && \
    bin/elasticsearch-reset-password -u $ELASTICSEARCH_USER -i < ./password && \
    touch /tmp/isOk; \
fi
