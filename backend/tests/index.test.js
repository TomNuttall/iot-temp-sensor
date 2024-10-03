import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb'
import { handler } from '../src/index'

const ddbMock = mockClient(DynamoDBClient)

describe('index', () => {
  beforeEach(() => {
    ddbMock.reset()
  })

  it('checks succesful response', async () => {
    // Arrange
    const date = new Date()
    ddbMock
      .on(QueryCommand, {
        ExpressionAttributeValues: {
          ':queryDate': { S: date.toLocaleDateString('en-GB') },
        },
      })
      .resolves({
        Items: [
          {
            date: { S: date.toLocaleDateString('en-GB') },
            time: { N: Math.floor(date.getTime() / 1000).toString() },
            temp: { N: '10' },
          },
        ],
      })

    const event = {
      queryStringParameters: { date: date.toLocaleDateString('en-GB') },
    }

    // Act
    const res = await handler(event)

    // Assert
    expect(res.statusCode).toBe(200)

    const data = JSON.parse(res.body)
    expect(data).toHaveLength(1)
  })
})
