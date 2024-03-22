FROM alpine

RUN apk update && apk --no-cache add \
    curl \
    openssl \
    prometheus

RUN openssl req \
    -x509 \
    -newkey rsa:2048 \
    -nodes \
    -subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
    -keyout /etc/prometheus/private.key \
    -out /etc/prometheus/certificate.crt

COPY ./prometheus.sh /usr/local/bin/prometheus.sh

RUN chmod +x /usr/local/bin/prometheus.sh

ENTRYPOINT [ "prometheus.sh" ]