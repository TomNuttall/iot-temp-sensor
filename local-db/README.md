# Local DB

**Offline DynamoDB table**

## Overview

- Docker compose uses amazon/dynamodb-local image.

## Requirements

- [Docker](https://www.docker.com)

## Usage

Creates a local DynamoDB table and prefills with random data [See populate-items.js](local-db/populate-items.js)

```bash
yarn dev
```

Can inspect and edit local db table in browser

```
http://localhost:8001
```
