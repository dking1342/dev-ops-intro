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
![Network](/assets/docker_network.png "Docker Network")

Create a network for Docker using the command

```
docker network create mongo-network
```

You can use the command <code>docker network ls</code> to see the newly made docker network.

### Docker run containers
To run the container we need to use the following command: 

```
docker run -p 27017:27017 -d \ 
-e MONGO_INITDB_ROOT_USERNAME=XXXXX \
-e MONGO_INITDB_ROOT_USERNAME=XXXXX \
--name mongodb \
--net mongo-network \
mongo 
```

This format can be found in the image page. It will show which flags and other info is needed to run the container. After executing the command it will run and start the container. You can check to see if it is running by using the <code>docker ps</code> or <code>docker logs</code> command.

### Config nodeJS to Mongo
Set up controllers for each endpoint to connect to the mongodb container. You can do this with MongoClient then connect to the db and perform the required function. You can check the progress using the mongo-express gui or the mongo shell. 

### Docker Compose
A structured way to run docker commands in a container. The files used are yaml and the structure is seen below.

![Compose](/assets/docker_compose.png "Docker Compose")

To get the yaml file to work properly you will need to run the following command:

```
docker-compose -f file.yaml up -d
```

The file name will be whatever you saved the yaml file as in your directory. Make sure that no containers are running beforehand so that the new compose command does not conflict with any running containers. To turn it off then you can write the following command

```
docker-compose -f file.yaml down
```

You can check to see if the containers and server are down by writing the command <code>docker network ls</code> and you should see that it is gone.

### Dockerfile
After you have made an artifact or app then this is the workflow that you will go through to turn it into its own image which can be used as a container.

![Dockerfile1](/assets/dockerfile1.png "Dockerfile workflow")

A docker file is a manifest that details your image that you will make. It is a text file that always goes by the filename Dockerfile. The docker file will cover which image it is from, any environment variables, run commands (linux commands), copy to a location in the image and commands to run as the entry point for the server or when it becomes a container.

![Dockerfile1](/assets/dockerfile2.png "Dockerfile workflow")

After you make the docker file you will need to build it. Use the command below to get it built

```
docker build -t name:version . 
```

The command docker build has the flag -t to tell the name then the last part of this command is where it will be stored. This should be the home directory. If not then you will need to specify where it will be in the directory.

