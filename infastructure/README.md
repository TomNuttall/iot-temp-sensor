# Infastructure

## Overview

- CloudFormation templates used to deploy infastructure on AWS.
  - Cloudfront-cert must be used on us-east-1 region.
- DynamoDB Schema
  - Partion key is date hash key and timestamp sort key.
- GitHub action runs on push to main branch.
  - deploy-frontend runs on change to dashboard folder
    - Builds frontend, runs unit tests then deploys to S3 Buckets.
    - Creates cloudfront invalidation on index.html after deploying to s3 bucket.
  - deploy-backend runs on change to backend folder
    - Runs lambda unit tests then deploys Lambda.

## Architecture Diagram

Backend
<img
  src='../diagrams/iot_diagram.png'
  raw=true
  alt='IOT Architecture Diagram'
  width="100%"
  height="auto"
/>

Backend
<img
  src='../diagrams/backend_diagram.png'
  raw=true
  alt='AWS Backend Architecture Diagram'
  width="100%"
  height="auto"
/>

Frontend
<img
  src='../diagrams/frontend_diagram.png'
  raw=true
  alt='AWS Frontend Architecture Diagram'
  width="100%"
  height="auto"
/>
