# IoT Demo Project

## Project Overview

### :sun_behind_small_cloud: Temperature Sensor

> :book: [Date Source Readme](microcontroller/README.md)

- Esp32 microcontroller connected to a temperature sensor.
- Average Reading sent to AWS IoT Core and message added to DynamoDB table.

### 🛠️ AWS Backend

> :book: [Backend Readme](backend/README.md)

- API Gateway with Lambda integration reads DynamoDB table and returns data.

### 📈 React Frontend

> :book: [Dashboard Readme](dashboard/README.md)

- React dashboard consumes API with date picking.
- ChartJS used for displaying graphs.

### :bricks: Infastructure

> :book: [Infastructure Readme](infastructure/README.md)

- CloudFormation templates used to deploy AWS infastructure
- GitHub actions deploy dashboard to S3 bucket and backend lambda.

### :bricks: Local DB

> :book: [Local DB Readme](local-db/README.md)

- Docker image for local DynamoDB tables.

## Usage

### Local Db

Start up (and populate) local DynamoDB docker image

```
cd local-db
yarn dev
```

### Backend

Start up local lambda and connect to local DynamoDB table

```
cd backend
yarn dev
```

### Frontend

Start frontend and connect to local backend.

```
cd dashboard
yarn dev
```

## Demo

https://iot.tomnuttall.dev
