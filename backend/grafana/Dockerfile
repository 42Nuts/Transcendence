FROM grafana/grafana:latest

USER root

RUN apk update && apk --no-cache add \
    openssl

RUN openssl req \
    -x509 \
    -newkey rsa:2048 \
    -nodes \
    -subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
    -keyout /etc/grafana/grafana.key \
    -out /etc/grafana/grafana.crt

RUN chmod 777 /etc/grafana/grafana.key /etc/grafana/grafana.crt

COPY ./grafana.sh /usr/bin/grafana.sh

RUN chmod +x /usr/bin/grafana.sh

ENTRYPOINT [ "grafana.sh" ]
