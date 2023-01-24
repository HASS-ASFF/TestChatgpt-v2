# Dockerfile for React client

From node:18.13.0

WORKDIR /app

COPY  package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]