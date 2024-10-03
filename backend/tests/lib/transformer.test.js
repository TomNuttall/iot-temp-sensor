import { Transformer } from '../../src/lib/transformer'

const transformer = new Transformer()

describe('transformData', () => {
  it('transforms results', async () => {
    // Arrange
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-02')
    const results = [
      [
        {
          date: { S: date1.toLocaleDateString('en-GB') },
          time: { N: Math.floor(date1.getTime() / 1000).toString() },
          temp: { N: '10' },
        },
        {
          date: { S: date1.toLocaleDateString('en-GB') },
          time: { N: Math.floor(date1.getTime() / 1000).toString() },
          temp: { N: ' 11' },
        },
      ],
      [
        {
          date: { S: date2.toLocaleDateString('en-GB') },
          time: { N: Math.floor(date1.getTime() / 1000).toString() },
          temp: { N: '5' },
        },
      ],
    ]

    // Act
    const res = transformer.transformDates(results)

    // Assert
    expect(res).toHaveLength(2)
    expect(res[0]).toEqual(
      expect.objectContaining({
        date: date1.toLocaleDateString('en-GB'),
      }),
    )
  })

  it('handles empty results', async () => {
    // Arrange
    const results = []

    // Act
    const res = transformer.transformDates(results)

    // Assert
    expect(res).toHaveLength(0)
  })
})
