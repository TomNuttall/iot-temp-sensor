import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DateRangePicker from '.'

describe('DateRangePicker', () => {
  const date = new Date()

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true, toFake: ['Date'] })
    vi.setSystemTime(date)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with buttons', async () => {
    // Arrange
    const mock = vi.fn()

    // Act
    render(<DateRangePicker onDateChange={mock} />)

    // Assert
    const element = await screen.findByText('Yesterday')
    expect(element).toBeInTheDocument()
  })

  it('calls callback on button press', async () => {
    // Arrange
    const mock = vi.fn()

    // Act
    render(<DateRangePicker onDateChange={mock} />)

    const element = await screen.findByText('Yesterday')
    await userEvent.click(element)

    // Assert
    expect(mock).toHaveBeenCalled()
  })
})
