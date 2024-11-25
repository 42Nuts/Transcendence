FROM postgres:latest

RUN apt-get update && apt-get install -y \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

COPY ./healthcheck.sh /usr/local/bin/healthcheck.sh
COPY ./postgresql.sh /usr/local/bin/postgresql.sh

RUN chmod +x /usr/local/bin/healthcheck.sh
RUN chmod +x /usr/local/bin/postgresql.sh

ENTRYPOINT ["dumb-init", "--"]
CMD ["postgresql.sh"]
