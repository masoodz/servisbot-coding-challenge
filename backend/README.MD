# Express Application API

This project is a Node.js application using Express. It provides a REST API to manage bots, workers, and their logs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

```bash
# Check Node.js and npm version
node --version
npm --version
```


### Installing

A step by step series of examples that tell you how to get a development env running:

1. Clone the repository

```bash
git clone https://thisrepository.git
cd backend
```

2. Install NPM packages

```bash
npm install
```

3. Start the development server

```bash
npm start
```

This will start the server on [http://localhost:3000](http://localhost:3000), unless configured otherwise.

## Running the tests

```bash
npm test
```

This command will run the tests using Jest. It will provide output in the terminal about which tests passed and which failed.

## API Reference

### Endpoints

- \`GET /bots\` - Retrieve a list of all bots.
- \`GET /bots/:botId/workers\` - Retrieve all workers associated with a specific bot.
- \`GET /workers/:workerId/logs\` - Retrieve all logs for a specific worker.
- \`GET /bots/:botId/logs\` - Retrieve all logs for a specific bot.


