import { handler } from '../lambda/index'

describe('lambda', () => {
  it('checks succesful response', async () => {
    // Arrange
    const event = { queryStringParameters: {} }

    // Act
    const res = await handler(event)

    // Assert
    expect(res.statusCode).toBe(200)
  })

  it('checks query string parameters', async () => {
    // Arrange
    const event = { queryStringParameters: { from: 10, to: 20 } }

    // Act
    const res = await handler(event)
    const data = JSON.parse(res.body)

    // Assert
    expect(data.length).toBeTruthy()
    const filteredData = data.filter(
      (item) =>
        item.time < event.queryStringParameters.from ||
        item.time > event.queryStringParameters.to,
    )
    expect(filteredData.length).toBeFalsy()
  })
})
