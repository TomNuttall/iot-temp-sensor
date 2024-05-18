# Dashboard
Frontend created with Vite, React + TypeScript.

## Overview
- React dashboard calls API with query string date range to display temperature data
- [react-chartjs-2](https://react-chartjs-2.js.org) used for displaying graphs
- [react-day-picker](https://react-day-picker.js.org) used for selecting mutliple dates
- [react-query](https://tanstack.com/query/latest/docs/framework/react/overview) + axios used for data fetching
- Deployed to S3 bucket and uses CloudFront

## Run
```bash
yarn dev
```

### Env
Copy and rename .env.example to .env.
Can connect to localhost api (if backend running) or live api.

```bash
VITE_USE_LOCALHOST=true
```

### Test
Run unit tests
```bash
yarn test
```
