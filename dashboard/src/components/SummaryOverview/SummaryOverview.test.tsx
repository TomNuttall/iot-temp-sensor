import { render, screen } from '@testing-library/react'
import { TemperatureSeries } from '../../lib/IoTApi'
import SummaryOverview from '.'

describe('SummaryOverview', () => {
  it('renders with loading', async () => {
    // Arrange
    const tempData: TemperatureSeries[] = []
    const loading = true

    // Act
    render(<SummaryOverview loading={loading} tempData={tempData} />)

    // Assert
    expect(
      await screen.findByTestId('summary-overview-loading'),
    ).toBeInTheDocument()
  })

  it('renders with no TempData', async () => {
    // Arrange
    const tempData: TemperatureSeries[] = []
    const loading = false

    // Act
    render(<SummaryOverview loading={loading} tempData={tempData} />)

    // Assert
    expect(await screen.findAllByText('0.00', { exact: false })).toHaveLength(3)
  })

  it('renders with TempData', async () => {
    // Arrange
    const minTemp = { temp: 0, time: 1 }
    const maxTemp = { temp: 20, time: 2 }
    const tempData: TemperatureSeries[] = [
      { date: '', values: [maxTemp, minTemp] },
    ]
    const loading = false

    // Act
    render(<SummaryOverview loading={loading} tempData={tempData} />)

    // Assert
    expect(
      await screen.findByText('20.00', { exact: false }),
    ).toBeInTheDocument()
  })
})
