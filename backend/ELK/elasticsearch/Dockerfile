FROM elasticsearch:8.12.2

USER root

RUN apt-get update && \
	apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

RUN openssl req \
	-x509 \
	-newkey rsa:2048 \
	-nodes \
	-subj "/C=KO/ST=Seoul/L=Gangnam/O=42seoul" \
	-keyout /usr/share/elasticsearch/config/private.key \
	-out /usr/share/elasticsearch/config/certificate.crt

RUN chmod 644 /usr/share/elasticsearch/config/certificate.crt && \
    chmod 644 /usr/share/elasticsearch/config/private.key

USER elasticsearch