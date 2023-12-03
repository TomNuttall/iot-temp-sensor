import { render, screen } from '@testing-library/react'
import TempCard from '.'

describe('TempCard', () => {
  it('renders title', async () => {
    // Arrange
    const temp = 25.1234
    const timestamp = 0
    const title = 'Min'

    // Act
    render(<TempCard temp={temp} timestamp={timestamp} title={title} />)

    // Assert
    expect(await screen.findByText(title)).toBeInTheDocument()
  })
})
