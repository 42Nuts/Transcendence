#!/usr/bin/env sh

echo "
worker_processes auto;

error_log /var/log/nginx/error.log warn;
load_module "modules/ngx_http_geoip_module.so";

events {
	worker_connections 1024;
}

http {
    include mime.types;
    log_format  main  '\$remote_addr - [\$time_local] \$request_method \$request_uri '
                      '\$status \$geoip_country_name \$geoip_city';

    server {
        access_log /var/log/nginx/access.log main;
        listen $NGINX_HOST:$NGINX_PORT ssl;

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

        location /metrics {
          stub_status on;
          allow all;
        }
    }
}
" > /etc/nginx/nginx.conf

nginx -g "daemon off;"
 