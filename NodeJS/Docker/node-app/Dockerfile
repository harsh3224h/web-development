FROM node:20.20.2-alpine3.22

WORKDIR /home/app

COPY package*.json .
RUN npm install 

COPY index.js index.js
COPY Dockerfile Dockerfile

EXPOSE 8000
CMD ["npm", "run", "dev"]
