#!/usr/bin/env sh

echo "
groups:
  - name: HostHighCpuLoad
    rules:
    - alert: HostHighCpuLoad
      expr: (100 - (avg by (instance) (irate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)) > $ALERT_CPU_USAGE
      for: "$EVALUATION_INTERVAL"s
      labels:
        severity: warning
      annotations:
        summary: Host high CPU load (instance {{ \$labels.instance }})
        description: \"CPU load is > $ALERT_CPU_USAGE\n  VALUE = {{ \$value }}\n  LABELS = {{ \$labels }}\"
        
" > /etc/prometheus/rules.yml

echo "
global:
  scrape_interval: "$SCRAPE_INTERVAL"s
  evaluation_interval: "$EVALUATION_INTERVAL"s

rule_files:
  - rules.yml

scrape_configs:
  - job_name: 'django'
    metrics_path: /prometheus/metrics
    static_configs:
      - targets: ['$DJANGO_HOST:$DJANGO_PORT']

  - job_name: 'server'
    static_configs:
      - targets: ['$NODE_EXPORTER_HOST:$NODE_EXPORTER_PORT']

  - job_name: 'nginx-prometheus-exporter'
    static_configs:
      - targets: ['$NGINX_EXPORTER_HOST:$NGINX_EXPORTER_PORT']

  - job_name: 'postgres-exporter'
    static_configs:
      - targets: ['$POSTGRES_EXPORTER_HOST:$POSTGRES_EXPORTER_PORT']
" > /etc/prometheus/prometheus.yml

echo "
tls_server_config:
  cert_file: /etc/prometheus/certificate.crt
  key_file: /etc/prometheus/private.key
" > /etc/prometheus/web-config.yml

prometheus  --config.file=/etc/prometheus/prometheus.yml \
            --storage.tsdb.path=/prometheus \
            --web.enable-lifecycle \
            --web.config.file=/etc/prometheus/web-config.yml
