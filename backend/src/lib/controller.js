import { QueryCommand } from '@aws-sdk/client-dynamodb'

const RECORD_BEGIN = new Date('2023-05-12')

export class Controller {
  constructor(ddbClient) {
    this.ddbClient = ddbClient
  }

  #validateDate(localDateString, today) {
    const [date, monthIndex, year] = localDateString.split('/')
    const dateObj = new Date(year, monthIndex - 1, date)

    let valid = !isNaN(dateObj)
    if (valid) {
      if (dateObj < RECORD_BEGIN || dateObj > today) {
        valid = false
      }
    }

    return valid
  }

  async get(dates) {
    const today = new Date()

    // A week should be the longest series for comparisons
    const processDates = dates?.length > 0 ? dates.slice(0, 7) : []

    const results = []
    for (let date of processDates) {
      if (!this.#validateDate(date, today)) {
        return []
      }

      const command = new QueryCommand({
        TableName: 'demo-db-iot-backend',
        KeyConditionExpression: '#date = :queryDate',
        ExpressionAttributeNames: { '#date': 'date' },
        ExpressionAttributeValues: { ':queryDate': { S: date } },
      })

      const res = await this.ddbClient.send(command)

      if (res?.Items) {
        results.push(res.Items)
      }
    }

    return results
  }
}
