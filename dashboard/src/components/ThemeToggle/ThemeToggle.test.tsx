import { render, screen } from '@testing-library/react'
import ThemeToggle from '.'

describe('ThemeToggle', () => {
  it('renders title', async () => {
    // Arrange

    // Act
    render(<ThemeToggle />)

    // Assert
    expect(await screen.findByText('')).toBeInTheDocument()
  })
})
