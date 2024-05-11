import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TemperatureSeries, TemperatureData } from '../../lib/IoTApi'
import TempChart from './TempChart'

describe('TempChart', () => {
  it('renders with tempData', async () => {
    // Arrange
    const minTemp: TemperatureData = { temp: 0, time: 1 }
    const maxTemp: TemperatureData = { temp: 20, time: 2 }
    const tempData: TemperatureSeries[] = [
      { date: '', values: [minTemp, maxTemp] },
    ]
    const setFilteredTempData = vi.fn()

    // Act
    render(
      <TempChart
        tempData={tempData}
        setFilteredTempData={setFilteredTempData}
      />,
    )

    // Assert
    expect(screen.getByTestId('temp-chart')).toBeInTheDocument()
  })

  it('renders with no tempdata', async () => {
    // Arrange
    const tempData: TemperatureSeries[] = []
    const setFilteredTempData = vi.fn()

    // Act
    render(
      <TempChart
        tempData={tempData}
        setFilteredTempData={setFilteredTempData}
      />,
    )

    // Assert
    expect(screen.getByTestId('temp-chart')).toBeInTheDocument()
  })
})
