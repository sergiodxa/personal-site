FROM mhart/alpine-node

# Create workdir
RUN mkdir /app
WORKDIR /app

# Copy code to workdir
COPY . .

# Build process
RUN echo 'Installing dependencies'
RUN yarn install --production
RUN echo 'Building Next.js application'
RUN yarn build
RUN echo 'Statically exporting site'
RUN yarn export

RUN ls /app

# # Test process
# RUN echo 'Running tests'
# RUN yarn test

# Move files to production
RUN mv /app/dist /public
