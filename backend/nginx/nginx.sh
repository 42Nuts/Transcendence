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
        listen 443 ssl;

        ssl_certificate /etc/nginx/certificate.crt;
        ssl_certificate_key /etc/nginx/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        root /var/www/html;

		location /static {
            # static 파일
        }

        location = / {
            index loginPage.html;
			# login 
        }

        location / {
            # django wsgi 연결
        }
    }
}
" > /etc/nginx/nginx.conf

nginx -g "daemon off;"
