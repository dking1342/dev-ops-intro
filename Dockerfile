FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

ARG NODE_ENV
# RUN npm install --only=production
# If you are building your code for production
# RUN npm ci --only=production
RUN if [ "$NODE_ENV" = "development" ]; \
      then npm install; \
      else npm ci --only=production; \
    fi

# Bundle app source
COPY . .
ENV PORT 5001

EXPOSE $PORT
CMD [ "node", "index.js" ]
