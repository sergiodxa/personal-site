FROM mhart/alpine-node:8

# Define workdir
WORKDIR /usr/src

COPY package.json yarn.lock ./
RUN yarn --production

# Build process
COPY . .
RUN yarn build && yarn export

# Move files to production
RUN mv /usr/src/dist /public
