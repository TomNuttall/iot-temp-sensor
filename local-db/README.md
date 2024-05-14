# Local DB

Offline DynamoDB table

## Overview

- Docker compose uses amazon/dynamodb-local image.

## Requirements

- [Docker](https://www.docker.com)

## Usage

Creates a local DynamoDB table and [prefills with random data](./populate-items.js)

```bash
yarn start
yarn dev
```

Inspect and edit local db table in browser

```
http://localhost:8001
```
