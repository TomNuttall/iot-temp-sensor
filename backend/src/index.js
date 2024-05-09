import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Controller } from './controller.js'
import { Transformer } from './transformer.js'

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

const ddbClient = DynamoDBDocumentClient.from(createClient())
const controller = new Controller(ddbClient)
const transformer = new Transformer()

export const handler = async (event) => {
  const query = event.multiValueQueryStringParameters

  const results = await controller.get(query?.date)
  const items = transformer.transformDates(results)

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      'content-Type': 'application/json',
      // 'cache-control': 'max-age=31536000',
    },
  }

  return response
}
