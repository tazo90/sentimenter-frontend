FROM node:13.7.0-alpine3.11

WORKDIR /app

# Copy only required files for yarn install
COPY ./app/package.json /app/package.json
COPY ./app/yarn.lock /app/yarn.lock

RUN yarn install

# Copy app files
COPY ./app .
