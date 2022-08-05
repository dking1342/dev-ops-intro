# Docker & NodeJS Crash Course

## Documentation
Documentation for the code base can be found <a href="https://www.youtube.com/watch?v=9zUHg7xjIqQ&list=WL&index=1">here</a>. A good example template of a nodeJS artifact can be found <a href="https://nodejs.org/en/docs/guides/nodejs-docker-webapp/">here</a> which comes from the nodejs documentation.

## Explanation
This project goes through a workflow for creating a nodejs artifact then making a docker continer.

## Helpful hints
#### sync docker to source code on local host but read only
```
docker run -p 5001:5001 -d --name node-app -v $(pwd):/app:ro -v /app/node_modules kavooce/node-web-app:1.0
```

#### kill container in one command
```
docker rm node-app -f
```

#### set env variables manually
```
docker run -p 5001:5001 -d --name node-app -v $(pwd):/app:ro -v /app/node_modules -e PORT=5000 kavooce/node-web-app:1.0
```

#### set env variables with .env file
```
docker run -p 5001:5001 -d --name node-app -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env kavooce/node-web-app:1.0
```

#### kill container and the volume
```
docker rm node-app -fv
```

#### prune the volumes to remove all volumes
```
docker volume prune
```

#### docker compose start or end
```
docker-compose up -d --build
docker-compose down -v
```

The build flag will rebuild the image in case there have been changes. Otherwise it will take whatever is available or already there excluding any changes.

#### docker compose using multiple files
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
docker-compose down -v
```

#### mongo container
To set the username and password go to the container after spinning it up with docker compose. Then use the exec command to go into the container. Type the command:

```
mongo -u process.env.MONGO_INITDB_ROOT_USERNAME -p process.env.MONGO_INITDB_ROOT_PASSWORD
```

#### mongo login using docker exec
To login using the docker exec command do this:

```
docker exec -it container-name mongo -u "username" -p "password"
```

#### mongo keep volumes
To keep the volumes when you stop a docker container then leave out the -v flag.

```
docker-compose down -v
```

To get rid of all other volumes then spin up the containers using the docker compose command then while the volumes are in use then type the command to remove any other volume not being used at that time. You need to make sure that the container is running otherwise it will delete any unused volumes at the time of the command.

```
docker volumes prune
```

#### mongo privileges
To grant privileges to a user that will be logged in you can run this command in mongo

```
db.grantRolesToUser("admin",[{role:"readWrite",db:"userdb"}])
```

For more on this go to <a href="https://www.mongodb.com/docs/manual/tutorial/manage-users-and-roles/">this page</a> for more info

#### start one container without other when it depends
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app
```