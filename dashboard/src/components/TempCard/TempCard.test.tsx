import { render, screen } from '@testing-library/react'
import TempCard from '.'

describe('TempCard', () => {
  it('renders title', async () => {
    // Arrange
    const temp = 25.1234
    const timestamp = 0
    const title = 'Min'
    const altDescription = 'Minimum Temperature'

    // Act
    render(
      <TempCard
        temp={temp}
        timestamp={timestamp}
        title={title}
        altDescription={altDescription}
      />,
    )

    // Assert
    expect(await screen.findByText(title)).toBeInTheDocument()
  })

  it('renders status text', async () => {
    // Arrange
    const temp = 25.1234
    const timestamp = new Date().getTime()
    const title = 'Min'
    const altDescription = 'Minimum Temperature'

    // Act
    render(
      <TempCard
        temp={temp}
        timestamp={timestamp}
        title={title}
        altDescription={altDescription}
      />,
    )

    // Assert
    const dateObj = new Date(timestamp)
    const time = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const srText = `${altDescription} ${temp.toFixed(2)} degrees at ${time}`
    expect(await screen.findByLabelText(srText)).toBeInTheDocument()
  })
})
