import { QueryCommand } from '@aws-sdk/lib-dynamodb'

const RECORD_BEGIN = new Date('2023-05-12')

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
      try {
        const dateCheck = Date.parse(date)

        if (isNaN(dateCheck)) return []

        if (dateCheck < RECORD_BEGIN) continue
      } catch (e) {
        console.error(e)
        return []
      }

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
