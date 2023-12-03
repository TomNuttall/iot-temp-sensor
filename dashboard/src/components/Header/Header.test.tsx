import { render, screen } from '@testing-library/react'
import Header from '.'

describe('Header', () => {
  it('renders title', async () => {
    // Arrange
    const title = 'Project'
    const repo = ''

    // Act
    render(<Header title={title} repo={repo} />)

    // Assert
    expect(await screen.findByText(title)).toBeInTheDocument()
  })
})
