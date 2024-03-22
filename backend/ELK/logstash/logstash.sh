#!/usr/bin/env sh

echo "
input {
    file {
        type => 'nginx'
        path => [ '/usr/share/logstash/logs/nginx.log' ]
        start_position => 'beginning'
    }
        start_position => 'beginning'
    }
}

filter {
    if [type] == 'nginx' {
        grok {
            match => { 'message' => '%{IPORHOST:remote_addr} - %{USER:remote_user} \[%{HTTPDATE:time_local}\] (?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest}) %{NUMBER:status} (?:%{NUMBER:body_bytes_sent}|-) %{GREEDYDATA:referrer} %{GREEDYDATA:http_user_agent} %{DATA:forwarder}' }
        }
    }
    }
}

output {
    elasticsearch {
        hosts => [ 'http://elasticsearch:9200' ]
    }
}
" > ./logstash.conf

logstash -f /logstash.conf
