#!/bin/sh

./manage.py makemigrations \
    users \
    matches \
    relationships \
    login
./manage.py migrate

mkdir -p logs
touch logs/log.log

echo "
{% if isHomePage %}
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <link rel=\"icon\" type=\"image/x-icon\" href=\"/static/assets/images/favicon.ico\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
  <title>PingPong</title>
  <link href=\"/static/assets/styles/output.css\" rel=\"stylesheet\">
  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\" rel=\"stylesheet\">
  <script>
    var requireNickName = '{{ requireNickName }}';
    var csrfToken = '{{ csrf_token }}';
    var userId = '{{ userId }}'
  </script>
</head>
<body class=\"bg-primary dark:bg-secondary\">
  <div id=\"root\"></div>
  <script type=\"module\" src=\"/static/index.js\"></script>
</body>
</html>
{% else %}
<!DOCTYPE html>
<html>
<head>
  <meta charset=\"utf-8\" />
  <link href=\"/static/assets/styles/output.css\" rel=\"stylesheet\">
</head>
<body class=\"flex justify-center items-center h-screen bg-primary dark:bg-secondary\">
  <div class=\"flex flex-col items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2\">
    <div class="title">
      <img src="/static/assets/images/logo-pingpong.svg" />
    </div>

    <a href='"$FOURTYTWO_OAUTH_CODE_URI?client_id=$FOURTYTWO_CLIENT_ID\&redirect_uri=$FOURTYTWO_REDIRECT_URI\&response_type=$FOURTYTWO_RESPONSE_TYPE"'>
        <button id=\"myButton\" class=\"bg-primary-button text-primary-button_text text-4xl font-extrabold px-8 py-3 rounded-full mt-1 hover:bg-primary-button_hover\">
            Login
        </button>
    </a>
  </div>
</body>
</html>
{% endif %}
" > ./templates/index.html

gunicorn config.wsgi --bind $DJANGO_HOST:$DJANGO_PORT & #--workers=1 --threads=2 --worker-class=gthread
daphne config.asgi:application --bind $DJANGO_HOST --port $WS_PORT #--workers=1 --threads=2 --worker-class=gthread
