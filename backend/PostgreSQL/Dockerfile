FROM postgres:latest


COPY ./postgresql.sh /usr/local/bin/postgresql.sh

RUN chmod +x /usr/local/bin/postgresql.sh

ENTRYPOINT [ "postgresql.sh" ]