# Backend

**API Gateway with Lambda integration reads DynamoDB table**

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
curl http://localhost:3000/dev?from=0
```

Unit tests

```bash
yarn test
```
