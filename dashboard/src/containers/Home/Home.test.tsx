import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { TemperatureSeries, TemperatureData } from '../../lib/IoTApi'
import Home from './Home'

import axios from 'axios'

const queryClient = new QueryClient()
vi.mock('axios')

describe('Home', () => {
  const date = new Date(2023, 11, 6, 12, 0, 0, 0)

  const minTemp: TemperatureData = { temp: 0, time: 1 }
  const maxTemp: TemperatureData = { temp: 20, time: 2 }
  const mocks: TemperatureSeries[] = [{ date: '', values: [minTemp, maxTemp] }]

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
    await act(async () =>
      render(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <Home />
          </QueryClientProvider>
        </MemoryRouter>,
      ),
    )

    // Assert
    expect(screen.getByTestId('home')).toBeInTheDocument()
  })
})
