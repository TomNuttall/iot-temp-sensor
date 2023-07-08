import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { startOfDay, endOfDay } from 'date-fns'
import DateRangePicker from '.'

describe('DateRangePicker', () => {
  const date = new Date(2023, 11, 6, 12, 0, 0, 0)

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
    const element = await screen.findByText('Choose Date Range')
    expect(element).toBeInTheDocument()
  })

  it('calls callback on first render', async () => {
    // Arrange
    const mock = vi.fn()

    // Act
    render(<DateRangePicker onDateChange={mock} />)

    // Assert
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('calls callback with correct args', async () => {
    // Arrange
    const mock = vi.fn()

    // Act
    render(<DateRangePicker onDateChange={mock} />)

    const from = startOfDay(date).valueOf()
    const to = endOfDay(date).valueOf()
    expect(mock).toBeCalledWith(from, to)
  })
})
