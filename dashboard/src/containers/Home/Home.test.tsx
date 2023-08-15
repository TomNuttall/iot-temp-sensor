import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { TemperatureData } from '../../lib/IoTApi'
import Home from './Home'
import axios from 'axios'

vi.mock('axios')

describe('Home', () => {
  const date = new Date(2023, 11, 6, 12, 0, 0, 0)

  const minTemp: TemperatureData = { temp: 0, time: 1 }
  const maxTemp: TemperatureData = { temp: 20, time: 2 }
  const mocks: TemperatureData[] = [minTemp, maxTemp]

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true, toFake: ['Date'] })
    vi.setSystemTime(date)

    //@ts-ignore
    axios.get.mockReset()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly with call to api', async () => {
    // Arrange
    //@ts-ignore
    axios.get.mockResolvedValue({
      data: mocks,
    })

    // Act
    await act(async () => render(<Home />))

    // Assert
    expect(screen.getByTestId('home')).toBeInTheDocument()
    expect(
      await screen.findByText(`Max ${maxTemp.temp}`, { exact: false }),
    ).toBeInTheDocument()
  })
})
