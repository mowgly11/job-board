FROM node:alpine

WORKDIR /application

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 80

CMD [ "node", "public/index.js" ]