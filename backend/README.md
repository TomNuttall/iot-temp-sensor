# Backend

API Gateway with Lambda integration reads DynamoDB table

## Overview

- Uses query string for date range querys on DynamoDB table
- Serverless offline used for local lambda/api gateway.

## Usage

```bash
yarn dev
```

### Test

Test api in browser or curl

```
curl http://localhost:3000/dev?date=01%02F01%2F2024&date=01%2F02%2F2024
```

Unit tests

```bash
yarn test
```
