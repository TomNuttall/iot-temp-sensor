import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DateRangePicker from '.'

describe('DateRangePicker', () => {
  it('renders with buttons', async () => {
    // Arrange
    const selectedDates: string[] = ['15/01/2024']
    const onDateChange = vi.fn()

    // Act
    render(
      <DateRangePicker
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />,
    )

    // Assert
    const element = await screen.findByText('Yesterday')
    expect(element).toBeInTheDocument()
  })

  it('calls callback on button press', async () => {
    // Arrange
    const selectedDates: string[] = ['15/01/2024']
    const onDateChange = vi.fn()

    // Act
    render(
      <DateRangePicker
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />,
    )

    const element = await screen.findByText('Yesterday')
    await userEvent.click(element)

    // Assert
    expect(onDateChange).toHaveBeenCalled()
  })
})
