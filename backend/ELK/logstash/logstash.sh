#!/usr/bin/env sh

echo "
input {
    file {
        path => [ '/usr/share/logstash/logs/*.log' ]
        start_position => 'beginning'
    }
}

filter {
    grok {
        match => { 'message' => '%{IPORHOST:remote_addr} - %{USER:remote_user} \[%{HTTPDATE:time_local}\] (?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest}) %{NUMBER:status} (?:%{NUMBER:body_bytes_sent}|-) %{GREEDYDATA:referrer} %{GREEDYDATA:http_user_agent} %{DATA:forwarder}' }
    }
}

output {
    elasticsearch {
        hosts => [ 'http://elasticsearch:9200' ]
    }
}
" > ./logstash.conf

logstash -f /logstash.conf
