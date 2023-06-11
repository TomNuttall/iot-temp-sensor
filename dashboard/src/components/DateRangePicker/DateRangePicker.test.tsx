import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { subHours, subMinutes } from 'date-fns'
import userEvent from '@testing-library/user-event'
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
    const element = await screen.findByText('Today')
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

    const from = subHours(date, date.getHours()).valueOf()
    const to = subMinutes(date, date.getMinutes()).valueOf()
    expect(mock).toBeCalledWith(from, to, 'Today')
  })

  it('calls callback on button press', async () => {
    // Arrange
    const mock = vi.fn()

    // Act
    render(<DateRangePicker onDateChange={mock} />)

    expect(mock).toHaveBeenCalledTimes(1)

    const button = await screen.findByText('Today')
    await userEvent.click(button)

    expect(mock).toHaveBeenCalledTimes(2)
  })
})
