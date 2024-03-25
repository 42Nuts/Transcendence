#!/usr/bin/env sh

export ELASTICSEARCH_HOSTNAME=$(cat /usr/share/logstash/es_hostname)

echo "
input {
    file {
        type => 'nginx'
        path => [ '/usr/share/logstash/logs/nginx.log' ]
        start_position => 'beginning'
    }

    file {
        type => 'django'
        path => [ '/usr/share/logstash/logs/django.log' ]
        start_position => 'beginning'
    }

    file {
        type => 'postgresql'
        path => [ '/usr/share/logstash/logs/postgresql.log' ]
        start_position => 'beginning'
    }
}

filter {
    if [type] == 'nginx' {
        grok {
            match => { 'message' => '%{IPORHOST:remote_addr} - \[%{HTTPDATE:time_local}\] %{GREEDYDATA:request_method} %{GREEDYDATA:request_uri} %{NUMBER:status} %{GREEDYDATA:country_name} %{GREEDYDATA:city}' }
        }
    }
    else if [type] == 'django' {
        grok {
            match => { 'message' => '%{LOGLEVEL:loglevel} %{TIMESTAMP_ISO8601:timestamp},%{NUMBER:microseconds} %{WORD:component} %{NUMBER:process_id} %{NUMBER:thread_id} %{DATA:request_info}: %{GREEDYDATA:request_detail}' }
        }
    }
    else if [type] == 'postgresql' {
        grok {
            match => { 'message' => '%{TIMESTAMP_ISO8601:timestamp} %{DATA:timezone} \[%{NUMBER:process_id}\] %{WORD:log_level}:  %{GREEDYDATA:message}' }
        }
    }
}

output {
    elasticsearch {
        hosts => [ 'https://$ELASTICSEARCH_HOSTNAME:$ELASTICSEARCH_PORT' ]
        cacert => '/usr/share/logstash/config/certs/http_ca.crt'
        user => '$ELASTICSEARCH_USER'
        password => '$ELASTICSEARCH_PASSWORD'
        ssl => true
    }
}
" > ./logstash.conf

echo "
http.host: '0.0.0.0'
xpack.monitoring.elasticsearch.hosts: [ 'https://$ELASTICSEARCH_HOSTNAME:$ELASTICSEARCH_PORT' ]
xpack.monitoring.elasticsearch.username: '$ELASTICSEARCH_USER'
xpack.monitoring.elasticsearch.password: => '$ELASTICSEARCH_PASSWORD'
xpack.monitoring.elasticsearch.ssl.certificate_authority: '/usr/share/logstash/config/certs/http_ca.crt'
xpack.monitoring.elasticsearch.ssl.verification_mode: certificate
" > ./config/logstash.yml

logstash -f ./logstash.conf
