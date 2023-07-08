# Use an official Node.js runtime as a parent image
FROM node:14-alpine

WORKDIR /app/

COPY ./package.json /app/

# Install dependencies
RUN npm install

# Copy the build directory to the container
COPY . /app/

CMD [ "npm", "run", "start"]