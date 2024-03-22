FROM alpine

RUN apk update && apk --no-cache add \
    curl \
    nginx \
    openssl

RUN openssl req \
    -x509 \
    -newkey rsa:2048 \
    -nodes \
    -subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
    -keyout /etc/nginx/private.key \
    -out /etc/nginx/certificate.crt

COPY ./nginx.sh /usr/local/bin/nginx.sh

RUN chmod +x /usr/local/bin/nginx.sh

EXPOSE 443 

ENTRYPOINT ["nginx.sh"]
