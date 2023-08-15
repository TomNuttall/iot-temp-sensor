import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IoTApi, TemperatureData } from './IoTApi'
import axios from 'axios'

vi.mock('axios')

describe('IoTApi', () => {
  const mocks: TemperatureData[] = [{ time: 5, temp: 10 }]

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
    expect(axios.get).toBeCalledTimes(1)
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
    expect(axios.get).toBeCalledTimes(1)
    expect(res).toStrictEqual(mocks)
  })
})
