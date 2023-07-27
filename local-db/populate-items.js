import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { startOfHour, subHours, format } from 'date-fns'
import table_schema from '../infastructure/db/schema.json' assert { type: 'json' }

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

const getTemp = (a, d, i, step) => {
  const x = i * step
  const radians = x * (Math.PI / 180)
  return a * Math.sin(radians) + (d + 2 * Math.random())
}

const populateTable = async () => {
  const now = startOfHour(new Date())
  const numReadings = 24 * 60
  const step = 360 / (24 - 1)
  let a = 0
  let d = 0

  const promises = [...Array(numReadings)].map((_, index) => {
    const timestamp = subHours(now, index)

    if (index % 24 === 0) {
      a = random(30)
      d = random(10)
    }

    return client.send(
      new PutItemCommand({
        TableName: table_schema.TableName,
        Item: {
          date: { S: format(timestamp, 'dd/MM/yyyy') },
          time: { N: timestamp.valueOf() },
          temp: { N: getTemp(a, d, index, step) },
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
