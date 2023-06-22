# Mimic Mania Server

This is the backend application for Mimic Mania mobile app, built with Node.js, Express, Socket.io, and Prisma. 

Mimic Mania is a game where players take turns mimicking words and phrases while others try to guess them.

## Prerequisites
* [Node.js 18](https://nodejs.org/en/blog/release/v18.16.1) installed on your machine with NPM (Node Package Manager).

## Installation
### - Clone the repository
```console
git clone https://github.com/cesarriva/mimic-mania-server
```
### - Navigate to the project directory
### - Install the dependencies
```console
npm install
```

## Configuration
1. Rename the .env.example file to .env.
2. Open the .env file and update necessary environment variables.
Usage
### Start the server locally
Run the following command in the project root directory:
```console
npm run prestart && npm run start:development
```
To run with code changes monitoring:
```console
npm run preserve && npm run serve
```

## Start with Docker and Docker Compose
To start the server, a database ([PostgreSQL 15](https://www.postgresql.org/about/news/postgresql-15-released-2526/)) 
and a database client ([pgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-macos/)) locally with 
Docker and Docker Compose:
1. Install [Docker and Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)

2. Run the following command in the project root directory:
```console
docker-compose up
```
If you want to rebuild the server Docker image run:
```console
docker-compose build --no-cache
```
or:
```console
docker-compose up --build
```
There is a npm script to build and run Docker Compose that could be used as well:
```console
npm run start:docker
```

By default, the server runs at http://localhost:4000/ and the 
database client runs at http://localhost:5555.

## Features
* **Express**: A fast and minimal web application framework for Node.js.
* **Socket.io**: Enables real-time bidirectional event-based communication between the server and clients.
* **Prisma**: A modern database toolkit for Node.js that simplifies database access and manipulation.
