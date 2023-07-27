import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { startOfDay, startOfHour } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
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

    const from = zonedTimeToUtc(startOfDay(date), 'Etc/UTC').valueOf()
    const to = zonedTimeToUtc(startOfHour(date), 'Etc/UTC').valueOf()

    expect(mock).toBeCalledWith(from, to)
  })
})
