# syntax=docker/dockerfile:1
FROM node:14.18.0
ENV NODE_ENV=development 
WORKDIR /price_tracker
COPY server server
COPY package.json package.json

RUN npm install -g --force yarn
RUN npm install -g --force nodemon 
RUN yarn
EXPOSE 8080
CMD [ "yarn", "server-dev" ]
