# Backend

API Gateway with Lambda integration reads DynamoDB table

## Overview

- Uses query string for date range querys on DynamoDB table
- [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-local.html) used for local lambda/api gateway.

## Run

```bash
yarn dev
```

### Test

Test api in browser or curl

```
curl http://localhost:3000/?date=01%02F01%2F2024&date=01%2F02%2F2024
```

Unit tests

```bash
yarn test
```
