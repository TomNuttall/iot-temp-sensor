# Dashboard
**Frontend created with Vite, React + TypeScript**

## Overview
- React dashboard calls API with query string date range to display temperature data
- ChartJS used for displaying graphs
- Deployed to S3 bucket and uses CloudFront

## Usage
```bash
yarn dev
```

### Env
Copy and rename .env.example to .env.
Can connect to localhost api (if backend running) or live api.

```bash
VITE_USE_LOCALHOST=true
```

### Testing

```bash
yarn test
```
