import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DateRangeOptions } from '../DateRangePicker/DateRangePicker'
import { TemperatureData } from '../../lib/IoTApi'
import TempChart from './TempChart'

describe('TempChart', () => {
  it('renders with tempData', async () => {
    // Arrange
    const minTemp: TemperatureData = { temp: 0, time: 1 }
    const maxTemp: TemperatureData = { temp: 20, time: 2 }
    const tempData: TemperatureData[] = [minTemp, maxTemp]
    const rangeOption: DateRangeOptions = 'Today'

    // Act
    render(<TempChart tempData={tempData} rangeOption={rangeOption} />)

    // Assert
    expect(screen.getByTestId('temp-chart')).toBeInTheDocument()
  })

  it('renders with no tempdata', async () => {
    // Arrange
    const tempData: TemperatureData[] = []
    const rangeOption: DateRangeOptions = 'Today'

    // Act
    render(<TempChart tempData={tempData} rangeOption={rangeOption} />)

    // Assert
    expect(screen.getByTestId('temp-chart')).toBeInTheDocument()
  })
})
