import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

import { handler } from '../lambda/index'

const ddbMock = mockClient(DynamoDBDocumentClient)

describe('lambda', () => {
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

    const event = { queryStringParameters: {} }

    // Act
    const res = await handler(event)

    // Assert
    expect(res.statusCode).toBe(200)

    const jsonBody = JSON.parse(res.body)
    expect(jsonBody).toHaveLength(1)
  })

  it('checks query string parameters', async () => {
    // Arrange
    ddbMock
      .on(QueryCommand, {
        ExpressionAttributeValues: {
          ':queryDate': '01/06/2023',
        },
      })
      .resolves({
        Items: [
          {
            date: '01/06/2023',
            time: 1,
            temp: 10,
          },
        ],
      })
      .on(QueryCommand, {
        ExpressionAttributeValues: {
          ':queryDate': '02/06/2023',
        },
      })
      .resolves({
        Items: [
          {
            date: '02/06/2023',
            time: 5,
            temp: 10,
          },
        ],
      })

    const event = {
      queryStringParameters: {
        from: String(0),
        to: String(new Date().valueOf()),
      },
    }

    // Act
    const res = await handler(event)
    const data = JSON.parse(res.body)

    // Assert
    expect(data.length).toBe(2)
    const filteredData = data.filter(
      (item) =>
        item.time < event.queryStringParameters.from ||
        item.time > event.queryStringParameters.to,
    )
    expect(filteredData.length).toBe(0)
  })
})
