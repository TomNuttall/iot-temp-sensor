import { getTemperatureColour } from './Helpers'

describe('getTemperatureColour', () => {
  it('returns a hsl colour', () => {
    // Arrange
    const value = `hsl`

    // Act
    const res = getTemperatureColour(0)

    // Assert
    expect(res).toMatch(value)
  })
})
