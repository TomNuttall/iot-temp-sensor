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
    const dates = [
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      new Date('2024-01-03'),
    ]

    dates.forEach((date) => {
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
    })

    // Act
    const dateParams = dates.map((date) => date.toLocaleDateString('en-GB'))
    const data = await controller.get(dateParams)

    // Assert
    expect(data.length).toBe(3)
  })

  it('returns data for query string parameters with cap at 7 dates', async () => {
    // Arrange
    const dates = [
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      new Date('2024-01-03'),
      new Date('2024-01-04'),
      new Date('2024-01-05'),
      new Date('2024-01-06'),
      new Date('2024-01-07'),
      new Date('2024-01-08'),
      new Date('2024-01-09'),
    ]

    dates.forEach((date) => {
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
    })

    // Act
    const dateParams = dates.map((date) => date.toLocaleDateString('en-GB'))
    const data = await controller.get(dateParams)

    // Assert
    expect(data.length).toBe(7)
  })

  it('returns no data for old dates', async () => {
    // Arrange
    const dates = [new Date('2020-01-01').toLocaleDateString('en-GB')]

    // Act
    const data = await controller.get(dates)

    // Assert
    expect(data.length).toBe(0)
  })

  it('returns no data for future dates', async () => {
    // Arrange
    const now = new Date()
    now.setDate(now.getDate() + 1)
    const dates = [now.toLocaleDateString('en-GB')]

    // Act
    const data = await controller.get(dates)

    // Assert
    expect(data.length).toBe(0)
  })

  it('returns no data for invalid parameter', async () => {
    // Arrange
    const dates = 'nondate'

    // Act
    const data = await controller.get(dates)

    // Assert
    expect(data.length).toBe(0)
  })
})
