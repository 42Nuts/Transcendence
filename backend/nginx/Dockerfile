FROM alpine

RUN apk update && apk add \
    nginx \
    openssl

RUN openssl req \
    -x509 \
    -newkey rsa:2048 \
    -nodes \
    -subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
    -keyout /etc/nginx/private.key \
    -out /etc/nginx/certificate.crt

COPY ./nginx.sh /usr/bin/nginx.sh
COPY ./src /var/www/html

RUN chmod +x /usr/bin/nginx.sh

EXPOSE 443 

ENTRYPOINT ["nginx.sh"]
