FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=pass

RUN mkdir -p /home/app

COPY  ./server /home/server

CMD [ "node","/home/server/main.js" ]