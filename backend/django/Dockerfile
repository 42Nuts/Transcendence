FROM python:3.11

COPY ./requirements.txt ./requirements.txt
COPY ./django.sh /usr/bin/django.sh

RUN chmod +x /usr/bin/django.sh

RUN  pip install --upgrade pip && pip install \
    --no-cache-dir \
    -r ./requirements.txt

WORKDIR /django

ENTRYPOINT ["django.sh"]
