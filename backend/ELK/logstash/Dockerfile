FROM logstash:8.12.2

USER root

COPY ./logstash.sh /usr/local/bin/logstash.sh
COPY ./healthcheck.sh /usr/local/bin/healthcheck.sh

RUN chmod +x /usr/local/bin/logstash.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

ENTRYPOINT [ "logstash.sh" ]
