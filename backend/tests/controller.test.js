import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { Controller } from '../src/controller'

const ddbMock = mockClient(DynamoDBDocumentClient)
const ddbClient = DynamoDBDocumentClient.from(new DynamoDBClient())
const controller = new Controller(ddbClient)

describe('Controller', () => {
  beforeEach(() => {
    ddbMock.reset()
  })

  it('returns data for today if no query string parameters', async () => {
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

    // Act
    const data = await controller.get()

    // Assert
    expect(data.length).toBe(1)
  })

  it('returns data for query string parameters', async () => {
    // Arrange
    const date1 = new Date('2023-06-04')
    const date2 = new Date('2023-06-05')
    const date3 = new Date('2023-06-06')

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

    const from = String(new Date('2023-06-04').valueOf())
    const to = String(new Date('2023-06-06').valueOf())

    // Act
    const data = await controller.get(from, to)

    // Assert
    expect(data.length).toBe(3)
  })

  it('returns no data for old dates', async () => {
    // Arrange
    const from = String(new Date('2020-01-01').valueOf())
    const to = String(new Date('2020-01-02').valueOf())

    // Act
    const data = await controller.get(from, to)

    // Assert
    expect(data.length).toBe(0)
  })
})
