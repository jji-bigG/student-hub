FROM node:18-alpine

WORKDIR /react-hub/

COPY public/ /react-hub/public
COPY src/ /react-hub/src
COPY package*.json /react-hub/

RUN yarn install

RUN ["yarn", "dev"]