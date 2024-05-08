import { vi } from 'vitest'
import axios from 'axios'
import { IoTApi, TemperatureSeries } from './IoTApi'

vi.mock('axios')

describe('IoTApi', () => {
  const mocks: TemperatureSeries[] = [
    { date: '2024-01-01', values: [{ time: 5, temp: 10 }] },
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
    const res = await IoTApi.get(0, 10)

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(res).toStrictEqual(mocks)
  })
})
