FROM node:10.15.3-alpine AS node

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/vacanze-front /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
