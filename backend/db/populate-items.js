import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { startOfHour, subHours, format } from 'date-fns'
import table_schema from './schema.json' assert { type: 'json' }

const client = new DynamoDBClient({
  region: 'local',
  endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
})

const createTable = async () => {
  await client.send(new CreateTableCommand(table_schema))
}

const random = (max) => {
  return Math.floor(Math.random() * max)
}

const populateTable = async () => {
  const now = startOfHour(new Date())
  const numReadings = 24 * 60
  const promises = [...Array(numReadings)].map((_, index) => {
    const timestamp = subHours(now, index)
    return client.send(
      new PutItemCommand({
        TableName: table_schema.TableName,
        Item: {
          date: { S: format(timestamp, 'dd/MM/yyyy') },
          time: { N: timestamp.valueOf() },
          payload: { M: { temp: { N: random(30) } } },
        },
      }),
    )
  })

  await Promise.all(promises)
}

;(async () => {
  await createTable()
  await populateTable()
})()
