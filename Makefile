all:
	docker compose up --build -d

clean:
	docker compose down

docker: 
	./docker/docker.sh

re:
	make clean
	make all

rmContainer:
	docker rm -f $(shell docker ps -aq)

rmImage: rmContainer
	docker rmi -f $(shell docker images -q)
	
.PHONY: all clean rmContainer rmImage docker 