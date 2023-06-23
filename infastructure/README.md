# infastructure

## Architecture Diagram

<img
  src='../docs/aws_architecture-diagram.svg'
  raw=true
  alt='AWS Architecture Diagram'
  height="500px"
  width="auto"
/>

## Deployment

- CloudFormation templates used to deploy infastructure on AWS
- GitHub action runs on push to main branch and will deploy dashboard to s3 bucket and deploy lambda package
