FROM node:11.9.0-alpine

WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install --pure-lockfile

ADD ./assets ./assets
ADD ./src ./src


CMD [ "yarn", "start"]