import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { handler } from '../src/index'

const ddbMock = mockClient(DynamoDBDocumentClient)

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
          ':queryDate': date.toLocaleDateString('en-GB'),
        },
      })
      .resolves({
        Items: [
          {
            date: date.toLocaleDateString('en-GB'),
            time: Math.floor(date.getTime() / 1000),
            temp: 10,
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
