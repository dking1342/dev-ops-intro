# Docker Swarm

## Documentation
Documentation for this code base can be found [here](https://www.youtube.com/watch?v=YYfefejSgWY&list=WL&index=1)

## Explanation
This tutorial covers the use cases of docker swarm as a container orchestrator.

## Tips
### Architecture
![Docker Architecture](/docker-architecture.jpg "Docker Architecture")

### Docker Swarm init
```
docker init
```
This commands will enable docker on your computer. This will enable the computer to be the manager. You can check to see if docker swarm is active on your computer by using this command:

```
docker info | grep -i swarm
```
It will show how you can have worker nodes join your swarm or how to set another manager node after you initialize the manager.

### Docker services
#### Get swarm services
In order to see if any services on the swarm are active you can use this command:
```
docker service ls
```

To show the containers or services active in the swarm you can use this command:
```
docker service ps <service name>
```

To inspect a service or find out details about the service you can use this command:
```
docker service inspect -pretty <service name>
```


#### Set swarm services
To create a new service you can use this command:
```
docker service create -p <host port>:<container port> --name <service name> <image>
```

If no specified number of nodes are given then only one will be made. In order to specify the number of nodes then you can use this command:
```
docker service create --name <service name> --replicas=<number of replicas> <image>
```

#### Update swarm services
To update or scale the swarm with containers you can use the command:
```
docker service scale <service name>=<number>
```

#### Remove swarm services or swarm
In order to delete a service you can use the command:
```
docker service rm <service name>
```
