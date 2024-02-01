all:
	docker compose up --build -d

clean:
	docker compose down

docker: 
	./docker/docker.sh

re:
	make clean
	make all

.PHONY: all clean docker