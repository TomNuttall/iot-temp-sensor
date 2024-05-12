import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { isValid } from 'date-fns'
import { parse } from 'date-fns/parse'

const RECORD_BEGIN = new Date('2023-05-12')

export class Controller {
  constructor(ddbClient) {
    this.ddbClient = ddbClient
  }

  #validateDate(date, today) {
    const dateObj = parse(date, 'dd/MM/yyyy', new Date())

    let valid = isValid(dateObj)
    if (valid) {
      if (dateObj < RECORD_BEGIN || dateObj > today) {
        valid = false
      }
    }

    return valid
  }

  async get(dates) {
    const today = new Date()
    if (!dates) {
      dates = [today.toLocaleDateString('en-GB')]
    }

    // A week should be the longest series for comparisons
    const processDates = dates.slice(0, 7)

    const results = []
    for (let date of processDates) {
      if (!this.#validateDate(date, today)) {
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
