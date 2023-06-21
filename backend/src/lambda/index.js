import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

const createClient = () => {
  if (process.env.MOCK_DYNAMODB_ENDPOINT) {
    return new DynamoDBClient({
      region: 'local',
      endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    })
  }
  if (process.env.IS_OFFLINE) {
    return new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    })
  } else {
    return new DynamoDBClient()
  }
}

const client = createClient()
const dynamo = DynamoDBDocumentClient.from(client)

export const handler = async (event) => {
  const query = event.queryStringParameters

  const recordDateStart = new Date('05/12/2023')
  let dateFrom = query?.from ? new Date(Number(query.from)) : new Date()
  if (dateFrom < recordDateStart) {
    dateFrom = recordDateStart
  }
  const dateTo = query?.to ? new Date(Number(query.to)) : new Date()

  const results = []
  while (dateFrom < dateTo) {
    const res = await dynamo.send(
      new QueryCommand({
        TableName: 'demo-db-iot-backend',
        KeyConditionExpression: '#date = :queryDate',
        ExpressionAttributeNames: { '#date': 'date' },
        ExpressionAttributeValues: {
          ':queryDate': dateFrom.toLocaleDateString('en-GB'),
        },
      }),
    )

    results.push(...res.Items)
    dateFrom.setDate(dateFrom.getDate() + 1)
  }

  const items = results?.map((x) => {
    const {
      time,
      payload: { temp },
    } = x
    return { time, temp }
  })

  const responseHeaders = {
    'content-Type': 'application/json',
    'cache-control': 'max-age=31536000',
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: responseHeaders,
  }

  return response
}
