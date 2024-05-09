import { Transformer } from '../src/transformer'

const transformer = new Transformer()

describe('transformData', () => {
  it('transforms results', async () => {
    // Arrange
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-02')
    const results = [
      [
        {
          date: date1.toLocaleDateString('en-GB'),
          time: Math.floor(date1.getTime() / 1000),
          temp: 10,
        },
        {
          date: date1.toLocaleDateString('en-GB'),
          time: Math.floor(date1.getTime() / 1000),
          temp: 11,
        },
      ],
      [
        {
          date: date2.toLocaleDateString('en-GB'),
          time: Math.floor(date1.getTime() / 1000),
          temp: 5,
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
