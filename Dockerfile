FROM node:16.15.0-buster

RUN mkdir /app
COPY package.json /app/
WORKDIR /app/
RUN npm i

COPY index.js /app/


ENTRYPOINT [ "node", "/app/index.js"]