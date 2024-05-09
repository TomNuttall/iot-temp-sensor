import { QueryCommand } from '@aws-sdk/lib-dynamodb'

export class Controller {
  constructor(ddbClient) {
    this.ddbClient = ddbClient
  }

  async get(dates) {
    if (!dates) {
      dates = [new Date().toLocaleDateString('en-GB')]
    }

    // A week should be the longest series for comparisons
    const processDates = dates.slice(0, 7)

    const results = []
    for (let date of processDates) {
      // try {
      //   const [day, month, year] = date.split('/')

      //   if (!day || !month || !year) continue
      // } catch (e) {
      //   console.error(e)
      //   return []
      // }

      const res = await this.ddbClient.send(
        new QueryCommand({
          TableName: 'demo-db-iot-backend',
          KeyConditionExpression: '#date = :queryDate',
          ExpressionAttributeNames: { '#date': 'date' },
          ExpressionAttributeValues: { ':queryDate': date },
        }),
      )

      if (res?.Items) {
        results.push(res.Items)
      }
    }

    return results
  }
}
