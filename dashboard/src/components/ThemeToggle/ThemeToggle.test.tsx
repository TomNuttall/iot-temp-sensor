import { render, screen } from '@testing-library/react'
import ThemeToggle from '.'

describe('ThemeToggle', () => {
  it('has an aria label', async () => {
    // Arrange

    // Act
    render(<ThemeToggle />)

    // Assert
    expect(await screen.findByLabelText('Toggle theme')).toBeInTheDocument()
  })
})
