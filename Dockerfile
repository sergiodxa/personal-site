FROM mhart/alpine-node:8

# Create workdir
RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --production

# Build process
COPY . .
RUN yarn build && yarn export

# Move files to production
RUN mv /app/dist /public
