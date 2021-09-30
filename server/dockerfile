FROM node:15.10.0-alpine3.10

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm install yarn 

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]