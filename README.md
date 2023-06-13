# IoT Temp Sensor

**Demo project to help learn more about AWS**

## Demo
https://iot.tomnuttall.dev

## Project Overview
- Data Source
  - Esp32 microcontroller connected to a temperature sensor
  - Reads temperature once a minute
  - Every 30 mins average temperature sent to AWS IoT Core
  - IoT Topic Rule adds message to DynamoDB table
- Backend
  - API Gateway with Lambda integration reads DynamoDB table and returns data
  - Docker and serverless offline used for local development
- Frontend
  - React dashboard calls API with query string date range to display temperature data
  - ChartJs used for displaying graphs
  - Deployed to S3 bucket and uses CloudFront
 
<img
  src='./docs/aws_architecture-diagram.svg'
  raw=true
  alt='AWS Architecture Diagram'
  height="500px"
  width="auto"
/>
## Deployment

- CloudFormation templates used to deploy infastructure on AWS
- GitHub action runs on push to main branch and will deploy dashboard to s3 bucket and deploy lambda package

## Usage

### backend

Uses docker amazon/dynamodb-local docker image to run local DynamoDB and serverless offline for local Lambda/API Gateway.

```shell
yarn local-db
yarn dev
```

### dashboard

Can connect to localhost api or live api.

```shell
yarn dev
```

## Testing
Unit tests included for dashboard and backend
```shell
yarn test
```
