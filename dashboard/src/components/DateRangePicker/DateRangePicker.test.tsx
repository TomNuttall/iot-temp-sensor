import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DateRangePicker from '.'

describe('DateRangePicker', () => {
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
