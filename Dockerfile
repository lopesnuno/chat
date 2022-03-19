FROM node:16-alpine

# Update OS
RUN apk --no-cache add ca-certificates && update-ca-certificates

# Create the working dir
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Do not use cache when we change node dependencies in package.json
COPY package.json yarn.lock ./

# Install packages + Prepare cache file
RUN apk update
RUN apk add g++ make python2
RUN yarn

RUN yarn install --frozen-lockfile --no-cache

COPY . /opt/app

EXPOSE 9090
