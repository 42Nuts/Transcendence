FROM python:3.11

COPY ./requirements.txt ./requirements.txt
COPY ./django.sh /usr/local/bin/django.sh
COPY ./healthcheck.sh /usr/local/bin/healthcheck.sh

RUN chmod +x /usr/local/bin/django.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

RUN  pip install --upgrade pip && pip install \
    --no-cache-dir \
    -r ./requirements.txt

WORKDIR /django

CMD ["django.sh"]
