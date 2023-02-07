# Dockerfile for Server

From node:18.13.0

WORKDIR /app

COPY  package.json /app/package.json

RUN npm install 

COPY . .

#EXPOSE 3080

CMD ["npm","start"]