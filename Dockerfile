FROM node:lts-alpine

RUN npm install -g http-server

COPY . /src
RUN cd /src && npm install
EXPOSE 80
CMD [ "http-server", "dist" ]