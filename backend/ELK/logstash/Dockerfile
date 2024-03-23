FROM logstash:7.17.18

USER root

COPY ./logstash.sh /usr/local/bin/logstash.sh

RUN chmod +x /usr/local/bin/logstash.sh

ENTRYPOINT [ "logstash.sh" ]
