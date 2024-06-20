import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { TemperatureSeries, TemperatureData } from '../../lib/IoTApi'
import Home from './Home'

import axios from 'axios'

const queryClient = new QueryClient()
vi.mock('axios')
const mockedAxios = axios.get as Mock

describe('Home', () => {
  const date = new Date(2023, 11, 6, 12, 0, 0, 0)

  const minTemp: TemperatureData = { temp: 0, time: 1 }
  const maxTemp: TemperatureData = { temp: 20, time: 2 }
  const mocks: TemperatureSeries[] = [{ date: '', values: [minTemp, maxTemp] }]

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true, toFake: ['Date'] })
    vi.setSystemTime(date)

    mockedAxios.mockReset()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly with call to api', async () => {
    // Arrangexw
    mockedAxios.mockResolvedValue({
      data: mocks,
    })

    // Act
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </MemoryRouter>,
    )

    // Assert
    expect(await screen.findByTestId('home')).toBeInTheDocument()
  })
})
