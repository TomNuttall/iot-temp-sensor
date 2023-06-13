# iot-temp-sensor

**Demo project to help learn more about AWS**
<img
  src='./docs/aws_architecture-diagram.svg'
  raw=true
  alt='AWS Architecture Diagram'
  height="200px"
  width="auto"
/>

## Project Overview

- Data Source
  - Esp32 microcontroller connected to a temperature sensor
  - Reads temperature once a minute
  - Every 30 mins average temperature sent to AWS IoT Core
  - IoT Topic Rule adds message to DynamoDB table
- Backend
  - API Gateway with lambda integration reads DynamoDB table and returns data
- Frontend
  - React dashboard calls API with query string date range to display temperature data
  - Deployed to S3 bucket and uses CloudFront

## Deployment

- Cloudformation templates used to deploy infastructure on AWS
- Github action runs on push to main branch and will deploy dashboard to s3 bucket and deploy lambda package

## Demo

https://iot.tomnuttall.dev

## Usage

### backend

Uses docker compose to run local DynamoDB and serverless offline for local Lambda/API Gateway.

```shell
yarn local-db
yarn dev
```

### dashboard

Can connect to localhost api or live api.

```shell
yarn dev
```
