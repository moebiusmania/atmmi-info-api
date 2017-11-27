FROM node:8-alpine
EXPOSE 8080
RUN apk update && apk add yarn
COPY /* /
RUN yarn install
CMD npm start
