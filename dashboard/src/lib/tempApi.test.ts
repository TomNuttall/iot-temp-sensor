import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from 'vitest'
import createFetchMock from 'vitest-fetch-mock'
import { TempApi, TempData } from './TempApi'

describe('TempApi', () => {
  const fetchMocker = createFetchMock(vi)
  const mocks: TempData[] = [{ time: 5, temp: 10 }]

  beforeAll(() => fetchMocker.enableMocks())
  afterEach(() => fetchMocker.resetMocks())
  afterAll(() => fetchMocker.disableMocks())

  it('calls api with no params', async () => {
    // Arrange
    fetchMocker.doMock(JSON.stringify(mocks))

    // Act
    const res = await TempApi.get()

    // Assert
    expect(fetchMocker).toBeCalledTimes(1)
    expect(res).toHaveLength(mocks.length)
  })

  it('calls api with params', async () => {
    // Arrange
    fetchMocker.doMock(JSON.stringify(mocks))

    // Act
    const res = await TempApi.get(0, 10)

    // Assert
    expect(fetchMocker).toBeCalledTimes(1)
    expect(res).toHaveLength(mocks.length)
  })
})
