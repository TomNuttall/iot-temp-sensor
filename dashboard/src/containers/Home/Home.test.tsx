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
import { render, screen, act } from '@testing-library/react'
import { TempData } from '../../lib/tempApi'
import Home from './Home'

describe('Home', () => {
  const fetchMocker = createFetchMock(vi)

  const minTemp: TempData = { temp: 0, time: 1 }
  const maxTemp: TempData = { temp: 20, time: 2 }
  const mocks: TempData[] = [minTemp, maxTemp]

  beforeAll(() => fetchMocker.enableMocks())
  afterEach(() => fetchMocker.resetMocks())
  afterAll(() => fetchMocker.disableMocks())

  it('renders correctly with call to api', async () => {
    // Arrange
    fetchMocker.doMock(JSON.stringify(mocks))

    // Act
    await act(async () => render(<Home />))

    // Assert
    expect(screen.getByTestId('home')).toBeInTheDocument()
    expect(fetchMocker).toHaveBeenCalled()
    expect(
      await screen.findByText(`Max ${maxTemp.temp}`, { exact: false }),
    ).toBeInTheDocument()
  })
})
