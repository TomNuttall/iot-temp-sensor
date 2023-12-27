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

    const data = JSON.parse(res.body)
    expect(data).toHaveLength(1)
  })

  it('checks query string parameters', async () => {
    // Arrange
    const date1 = new Date('June 4, 2023')
    const date2 = new Date('June 5, 2023')
    const date3 = new Date('June 6, 2023')

    ddbMock
      .on(QueryCommand, {
        ExpressionAttributeValues: {
          ':queryDate': date1.toLocaleDateString('en-GB'),
        },
      })
      .resolves({
        Items: [
          {
            date: date1.toLocaleDateString('en-GB'),
            time: Math.floor(date1.getTime() / 1000),
            temp: 10,
          },
        ],
      })
      .on(QueryCommand, {
        ExpressionAttributeValues: {
          ':queryDate': date2.toLocaleDateString('en-GB'),
        },
      })
      .resolves({
        Items: [
          {
            date: date2.toLocaleDateString('en-GB'),
            time: Math.floor(date2.getTime() / 1000),
            temp: 10,
          },
        ],
      })
      .on(QueryCommand, {
        ExpressionAttributeValues: {
          ':queryDate': date3.toLocaleDateString('en-GB'),
        },
      })
      .resolves({
        Items: [
          {
            date: date3.toLocaleDateString('en-GB'),
            time: Math.floor(date3.getTime() / 1000),
            temp: 10,
          },
        ],
      })

    const event = {
      queryStringParameters: {
        from: String(new Date('June 4, 2023').valueOf()),
        to: String(new Date('June 5, 2023').valueOf()),
      },
    }

    // Act
    const res = await handler(event)

    // Assert
    const data = JSON.parse(res.body)
    expect(data.length).toBe(2)

    const filteredData = data.filter((item) => {
      const time = item.time * 1000
      return (
        time < event.queryStringParameters.from ||
        time > event.queryStringParameters.to
      )
    })
    expect(filteredData.length).toBe(0)
  })
})
