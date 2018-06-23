FROM node:6.9.1-alpine as builder
LABEL maintainer="singh.pratyush96@gmail.com"

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i -q && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN "$(npm bin)/ng build --prod --build-optimizer"

FROM nginx:1.13.3-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
