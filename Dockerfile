FROM node:lts-alpine

RUN npm install -g http-server

COPY . /src
RUN cd /src && npm install
EXPOSE 8080
CMD [ "http-server", "dist" ]
