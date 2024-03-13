#!/bin/sh

echo "
worker_processes auto;

error_log /var/log/nginx/error.log warn;

events {
	worker_connections 1024;
}

http {
    include mime.types;
    server {
        listen $NGINX_PORT ssl;

        ssl_certificate /etc/nginx/certificate.crt;
        ssl_certificate_key /etc/nginx/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location /static {
          alias /var/www/html/;
          # static 파일
        }

        location / {
          proxy_pass http://$DJANGO_HOST:$DJANGO_PORT;
        }

        location /ws {
          proxy_pass http://$DJANGO_HOST:$WS_PORT;
          proxy_http_version 1.1;
          proxy_set_header Upgrade \$http_upgrade;
          proxy_set_header Connection "Upgrade";
          proxy_set_header Host \$host;
        }
    }
}
" > /etc/nginx/nginx.conf

nginx -g "daemon off;"
 