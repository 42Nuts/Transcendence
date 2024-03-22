all:
	docker compose up --build -d

clean:
	docker compose down

fclean:
	make rmImage
	make rmData
	make rmLog

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

rmLog:
	rm -rf $(shell find . -name logs)

rmContainer:
	docker rm -f $(shell docker ps -aq)

rmImage: rmContainer
	docker rmi -f $(shell docker images -q)
	
.PHONY: all clean fclean re fre rmData rmContainer rmImage docker