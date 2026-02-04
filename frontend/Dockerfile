FROM alpine:latest

RUN apk add npm

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 5173
