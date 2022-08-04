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
