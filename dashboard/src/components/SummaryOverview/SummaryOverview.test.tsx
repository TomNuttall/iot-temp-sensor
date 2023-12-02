import { render, screen } from '@testing-library/react'
import { TemperatureData } from '../../lib/IoTApi'
import SummaryOverview from '.'

describe('SummaryOverview', () => {
  it('renders with no TempData', async () => {
    // Arrange
    const tempData: TemperatureData[] = []

    // Act
    render(<SummaryOverview tempData={tempData} />)

    // Assert
    expect(await screen.findAllByText('0.00')).toHaveLength(3)
  })

  it('renders with TempData', async () => {
    // Arrange
    const minTemp = { temp: 0, time: 1 }
    const maxTemp = { temp: 20, time: 2 }
    const tempData: TemperatureData[] = [maxTemp, minTemp]

    // Act
    render(<SummaryOverview tempData={tempData} />)

    // Assert
    expect(await screen.findAllByText('0.00')).toHaveLength(2)
    expect(await screen.findByText('20.00')).toBeInTheDocument()
  })
})
