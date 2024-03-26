FROM elasticsearch:8.12.2

USER root

COPY ./elasticsearch.sh /usr/local/bin/elasticsearch.sh
COPY ./healthcheck.sh /usr/local/bin/healthcheck.sh

RUN chmod +x /usr/local/bin/elasticsearch.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

USER elasticsearch

ENTRYPOINT [ "elasticsearch.sh" ]
