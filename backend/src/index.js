import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Controller } from './lib/controller.js'
import { Transformer } from './lib/transformer.js'

const createClient = () => {
  if (process.env.IS_OFFLINE) {
    return new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    })
  } else {
    return new DynamoDBClient()
  }
}

const controller = new Controller(createClient())
const transformer = new Transformer()

export const handler = async (event) => {
  const query =
    event.multiValueQueryStringParameters?.date ||
    event.queryStringParameters?.date?.split(',')
  console.log(query)

  const results = await controller.get(query)
  const items = transformer.transformDates(results)

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      'content-Type': 'application/json',
    },
  }

  return response
}
