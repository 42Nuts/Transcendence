#!/usr/bin/env sh

chown -R postgres:postgres /var/log/postgresql
chmod -R 770 /var/log/postgresql

docker-entrypoint.sh postgres -c config_file=/var/lib/postgresql/postgresql.conf
