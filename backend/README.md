# Backend
**API Gateway with Lambda integration reads DynamoDB table**

## Overview ##
- Uses query string for date range querys on DynamoDB table
- Docker compose uses amazon/dynamodb-local image.
- Serverless offline used for local lambda/api gateway.

## Requirements
- [Docker](https://www.docker.com)

## Usage

### Local DynamoDB
Creates a local table and prefills with random data [See populate-items.js](backend/db/populate-items.js)
```bash
yarn local-db
```
Can inspect and edit local db table in browser
```
http://localhost:8001
```

### Run

```bash
yarn dev
```

### Test
Can test api in browser or curl

```
curl http://localhost:3000/dev?from=0
```

Unit tests
```bash
yarn test
```
