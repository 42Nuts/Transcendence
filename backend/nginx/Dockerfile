FROM alpine

RUN apk update && apk --no-cache add \
    curl \
    nginx \
    nginx-mod-http-geoip \
    openssl

RUN openssl req \
    -x509 \
    -newkey rsa:2048 \
    -nodes \
    -subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
    -keyout /etc/nginx/private.key \
    -out /etc/nginx/certificate.crt

COPY ./nginx.sh /usr/local/bin/nginx.sh
COPY ./healthcheck.sh /usr/local/bin/healthcheck.sh

RUN chmod +x /usr/local/bin/nginx.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

EXPOSE 443 

CMD ["nginx.sh"]
