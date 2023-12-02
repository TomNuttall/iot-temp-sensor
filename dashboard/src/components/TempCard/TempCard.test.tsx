import { render, screen } from '@testing-library/react'
import TempCard from '.'

describe('TempCard', () => {
  it('renders title', async () => {
    // Arrange
    const temp = 25.1234
    const title = 'Min'

    // Act
    render(<TempCard temp={temp} title={title} />)

    // Assert
    expect(await screen.findByText(title)).toBeInTheDocument()
  })
})
