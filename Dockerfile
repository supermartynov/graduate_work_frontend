FROM node:14.17.1

WORKDIR /app

COPY package*.json ./app

RUN npm install

COPY . .

ENV NODE_ENV dev

EXPOSE 8080

RUN npm rebuild node-sass
CMD ["npm", "run", "serve"]