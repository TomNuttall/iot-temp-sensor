import { vi, Mock } from 'vitest'
import axios from 'axios'
import { IoTApi, TemperatureSeries } from './IoTApi'

vi.mock('axios')
const mockedAxios = axios.get as Mock

describe('IoTApi', () => {
  const dates = ['01/01/2024']
  const mocks: TemperatureSeries[] = [
    { date: dates[0], values: [{ time: 5, temp: 10 }] },
  ]

  beforeEach(() => {
    mockedAxios.mockReset()
  })

  it('doesnt not call api with no params', async () => {
    // Arrange
    mockedAxios.mockResolvedValue({
      data: mocks,
    })

    // Act
    await IoTApi.get()

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(0)
  })

  it('calls api with params', async () => {
    // Arrange
    mockedAxios.mockResolvedValue({
      data: mocks,
    })

    // Act
    const res = await IoTApi.get(dates)

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(res).toStrictEqual(mocks)
  })
})
