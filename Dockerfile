FROM node:boron-alpine
MAINTAINER Mario Behling <mb@mariobehling.de>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get clean && rm -rf /var/lib/apt/lists/*

# copy requirements
COPY package.json /usr/src/app/
COPY app.json /usr/src/app/
COPY tslint.json /usr/src/app/
COPY angular-cli.json /usr/src/app/

# install requirements
RUN npm install -g @angular/cli@latest
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 4200

CMD [ "ng", "serve" ]
