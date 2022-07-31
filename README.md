# Docker Crash Course

## Documentation
Documentation for the docker crash course can be found <a href="">here</a>

## Explanation
This crash course covers beginner concepts and fundamentals to a day to day devops engineer using docker.

## **Docker Notes**
## Docker basic commands
- COMMAND -- EXPLANATION
- docker ps -- list containers
- docker images -- list images
- docker pull -- pull an image or repo from a registry. the default will be the latest version
- docker run -- pulls image and starts container
- docker run -d -- pulls image but truncates the info shown after completed
- docker run *image*:*version* -- pull image with specific version and start container
- docker run -d -pXXXX:XXXX --name redis-older redis:4.0 -- create custom name for container
- docker start -- start one or more stopped containers
- docker start *id* -- starts a specific container with the noted id
- docker stop -- stop one or more running containers
- docker stop *id* -- stops a specific container with the noted id

## Container port vs Host port
![Ports](/assets/ports.png "Ports")

### Commands for running port
- COMMAND -- EXPLANATION
- docker run -p*host port*:*container port* *image* -- run image and bind port from host to container
- docker run -p6000:6235 redis -- example of binding ports

## Container troubleshooting
- COMMAND -- EXPLANATION
- docker logs *container id or container name* -- fetches the logs of the container
- docker exec -it *[container id] [container directory]* -- interactive guide within the container code base to modify, search

## Container work flow
![Workflow](/assets/docker-workflow.png "Docker Work flow")

### Create code base
Create the front end and back end. In the docker2 branch is it made using a vanilla JS front end with a nodeJS backend.

### Docker images
Go to docker hub and search the images you want to use. In our case we will use mongo and mongo-express. The command to pull the images is:

```
docker pull mongo
docker pull mongo-express
```

### Docker Network
Create a network for Docker using the command

```
docker network create mongo-network
```

You can use the command <code>docker network ls</code> to see the newly made docker network.

### Docker run containers
To run the container we need to use the following command: 

```
docker run -p 27017:27017 -d \ 
-e MONGO_INITDB_ROOT_USERNAME=kavooce \
-e MONGO_INITDB_ROOT_USERNAME=qweASDzxc321 \
--name mongodb \
--net mongo-network \
mongo 
```

This format can be found in the image page. It will show which flags and other info is needed to run the container. After executing the command it will run and start the container. You can check to see if it is running by using the <code>docker ps</code> or <code>docker logs</code> command.

### Config nodeJS to Mongo




