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

## Usage

- [backend](backend/README.md)
- [dashboard](dashboard/README.md)
- [infastructre](infastructure/README.md)
- [microcontroller](microcontroller/README.md)
