FROM alpine

RUN apk update && apk --no-cache add \
    openssl \
    prometheus

RUN openssl req \
    -x509 \
    -newkey rsa:2048 \
    -nodes \
    -subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
    -keyout /etc/prometheus/private.key \
    -out /etc/prometheus/certificate.crt

ENTRYPOINT [ "prometheus", \
            "--config.file=/etc/prometheus/prometheus.yml", \
            "--storage.tsdb.path=/prometheus", \
            "--web.enable-lifecycle", \
            "--web.config.file=/etc/prometheus/web-config.yml"]
