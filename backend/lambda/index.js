import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = process.env.IS_OFFLINE
  ? new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    })
  : new DynamoDBClient()
const dynamo = DynamoDBDocumentClient.from(client)

export const handler = async (event) => {
  const query = event.queryStringParameters
  const filterTimeMin = query && 'from' in query ? Number(query['from']) : 0
  const filterTimeMax =
    query && 'to' in query ? Number(query['to']) : new Date().valueOf()

  const res = await dynamo.send(
    new ScanCommand({
      TableName: 'demo-dbtable-iot-backend',
      FilterExpression: '#time BETWEEN :filterTimeMin AND :filterTimeMax',
      ExpressionAttributeNames: { '#time': 'time' },
      ExpressionAttributeValues: {
        ':filterTimeMin': filterTimeMin,
        ':filterTimeMax': filterTimeMax,
      },
    }),
  )

  const items = res.Items.map((x) => {
    const {
      time,
      payload: { temp },
    } = x
    return { time, temp }
  }).sort((a, b) => {
    if (a.time > b.time) {
      return 1
    } else if (a.time < b.time) {
      return -1
    } else {
      return 0
    }
  })

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: { 'content-type': 'application/json' },
  }

  return response
}
