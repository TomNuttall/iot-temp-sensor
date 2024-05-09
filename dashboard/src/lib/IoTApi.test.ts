import { vi } from 'vitest'
import axios from 'axios'
import { IoTApi, TemperatureSeries } from './IoTApi'

vi.mock('axios')

describe('IoTApi', () => {
  const dates = ['01/01/2024']
  const mocks: TemperatureSeries[] = [
    { date: dates[0], values: [{ time: 5, temp: 10 }] },
  ]

  beforeEach(() => {
    //@ts-ignore
    axios.get.mockReset()
  })

  it('calls api with no params', async () => {
    // Arrange
    //@ts-ignore
    axios.get.mockResolvedValue({
      data: mocks,
    })

    // Act
    const res = await IoTApi.get()

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(res).toStrictEqual(mocks)
  })

  it('calls api with params', async () => {
    // Arrange
    //@ts-ignore
    axios.get.mockResolvedValue({
      data: mocks,
    })

    // Act
    const res = await IoTApi.get(dates)

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(res).toStrictEqual(mocks)
  })
})
