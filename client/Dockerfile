FROM node:11.9.0-alpine as builder

WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install --pure-lockfile

ADD .browserslistrc .browserslistrc
ADD babel.config.js babel.config.js
ADD postcss.config.js postcss.config.js
ADD vue.config.js vue.config.js
ADD ./public ./public
ADD ./src ./src

RUN yarn build

FROM nginx:1.15.9-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf