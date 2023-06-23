# backend

Uses docker amazon/dynamodb-local docker image to run local DynamoDB and serverless offline for local Lambda/API Gateway.

```bash
yarn local-db
yarn dev
```

Can inspect local-db table in browser

```
http://localhost:8001
```

Can test api in browser or curl

```
curl http://localhost:3000/dev?from=0
```

## Testing

Unit tests

```bash
yarn test
```
