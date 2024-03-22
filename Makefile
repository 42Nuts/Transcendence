all:
	docker compose up --build -d

clean:
	docker compose down

docker: 
	./docker/docker.sh

re:
	make clean
	make all

fre:
	make fclean
	make all

rmData:
	rm -rf $(shell find . -name data)

rmContainer:
	docker rm -f $(shell docker ps -aq)

rmImage: rmContainer
	docker rmi -f $(shell docker images -q)
	
.PHONY: all clean rmContainer rmImage docker 