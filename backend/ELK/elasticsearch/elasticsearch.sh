#!/usr/bin/env sh

echo "y
$ELASTICSEARCH_PASSWORD
$ELASTICSEARCH_PASSWORD" > ./password

bin/elasticsearch
