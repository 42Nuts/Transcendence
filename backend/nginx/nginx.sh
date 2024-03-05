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

        root /var/www/html;

        location /static {
          alias /var/www/html/;
          # static 파일
        }

        location = / {
          index loginPage.html;
        }

        location /42oauth {
          proxy_pass http://$DJANGO_IP:$DJANGO_PORT;
        }

        location /home {
          proxy_pass http://$DJANGO_IP:$DJANGO_PORT;
        }

        location /v2 {
          proxy_pass http://$DJANGO_IP:$DJANGO_PORT;
        }

        location /ws {
          proxy_pass http://$DJANGO_IP:$WS_PORT;
          proxy_http_version 1.1;
          proxy_set_header Upgrade \$http_upgrade;
          proxy_set_header Connection "Upgrade";
          proxy_set_header Host \$host;
        }
    }
}
" > /etc/nginx/nginx.conf

echo "
<!DOCTYPE html>
<html>
<head>
  <meta charset=\"utf-8\" />
  <link href=\"/static/output.css\" rel=\"stylesheet\">
</head>
<body class=\"flex justify-center items-center h-screen bg-custom-background\">
  <div class=\"flex flex-col items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2\">
    <div class="title">
      <img src="/static/images/PingPongLogo.svg" />
    </div>

    
    <button id=\"myButton\" class=\"bg-custom-LIGHT-button text-white text-4xl font-extrabold px-8 py-3 rounded-full mt-1 hover:bg-custom-LIGHT-button-hover\">
      Login
    </button>
  </div>
  <script>
    document.getElementById('myButton').onclick = function () {
      location.href = '"$FOURTYTWO_OAUTH_CODE_URI?client_id=$FOURTYTWO_CLIENT_ID\&redirect_uri=$FOURTYTWO_REDIRECT_URI\&response_type=$FOURTYTWO_RESPONSE_TYPE"';
    };
  </script>
</body>
</html>
" > /var/www/html/loginPage.html

nginx -g "daemon off;"
 