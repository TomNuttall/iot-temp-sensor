# IoT Temp Sensor

**Demo project to help learn more about AWS**

## Project Overview

[Date Source](microcontroller/README.md)

- Esp32 microcontroller connected to a temperature sensor
- Reads temperature once a minute
- Every 30 mins average temperature sent to AWS IoT Core
- IoT Topic Rule adds message to DynamoDB table

[Backend](backend/README.md)

- API Gateway with Lambda integration reads DynamoDB table and returns data
- Docker and serverless offline used for local development

[Frontend](dashboard/README.md)

- React dashboard calls API with query string date range to display temperature data
- ChartJs used for displaying graphs
- Deployed to S3 bucket and uses CloudFront

[Infastructure](infastructure/README.md)

- CloudFormation templates for AWS infastructure
- GitHub actions to deploy frontend and backend changes on main branch push

## Demo

https://iot.tomnuttall.dev
