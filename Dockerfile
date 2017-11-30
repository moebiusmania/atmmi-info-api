FROM node:8.9.0-alpine
EXPOSE 8080
RUN apk update && apk add yarn
WORKDIR /app
ADD . /app
RUN yarn install
ENTRYPOINT yarn start
HEALTHCHECK CMD curl --fail http://localhost:8080/v1 || exit 1
