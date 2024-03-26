#!/usr/bin/env sh

echo "
[server]
http_addr = $GRAFANA_HOST
http_port = $GRAFANA_PORT
cert_key = /etc/grafana/grafana.key
cert_file = /etc/grafana/grafana.crt
enforce_domain = False
protocol = https
" > $GF_PATHS_CONFIG

grafana server --config $GF_PATHS_CONFIG
