FROM node:18-alpine as base

ARG PORT=4000

# Expose the application port
EXPOSE $PORT

# Define the location of the project files in the image
WORKDIR /app

# Copy the project files into the image (except the ones in .dockerignore)
COPY . /app

# Create a volume for the project files location (including dist and node_modules)
VOLUME ["/app"]

# Download dependencies and build the application
RUN npm install
RUN npm run prestart

FROM base as development
CMD ["npm", "run", "start:development"]

FROM base as production
CMD ["npm", "run", "start:production"]
