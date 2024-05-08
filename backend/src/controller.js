import { QueryCommand } from '@aws-sdk/lib-dynamodb'

const RECORD_BEGIN = new Date('2023-05-12')

export class Controller {
  constructor(ddbClient) {
    this.ddbClient = ddbClient
  }

  async get(from, to) {
    let dateFrom = from ? new Date(Number(from)) : new Date()
    if (dateFrom < RECORD_BEGIN) {
      dateFrom = RECORD_BEGIN
    }
    const dateTo = to ? new Date(Number(to)) : new Date()

    const results = []
    while (dateFrom <= dateTo) {
      const res = await this.ddbClient.send(
        new QueryCommand({
          TableName: 'demo-db-iot-backend',
          KeyConditionExpression: '#date = :queryDate',
          ExpressionAttributeNames: { '#date': 'date' },
          ExpressionAttributeValues: {
            ':queryDate': dateFrom.toLocaleDateString('en-GB'),
          },
        }),
      )

      if (res?.Items?.length > 0) {
        results.push(...res.Items)
      }
      dateFrom.setDate(dateFrom.getDate() + 1)
    }

    return results
  }
}
