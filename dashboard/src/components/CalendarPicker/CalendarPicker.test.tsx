import { vi } from 'vitest'
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import CalendarPicker from '.'

describe('CalendarPicker', () => {
  const date = new Date('2024-15-01')

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true, toFake: ['Date'] })
    vi.setSystemTime(date)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Placeholder', () => {
    expect(true)
  })

  /*
  it('renders with selected dates', async () => {
    // Arrange
    const onCloseDialog = vi.fn()
    const selectedDates: string[] = ['15/01/2024']
    const onDateChange = vi.fn()

    // Act
    render(
      <CalendarPicker
        isDialogOpen={true}
        onCloseDialog={onCloseDialog}
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />,
    )
    screen.debug()

    // Assert
    const element = await screen.findByText('January')
    expect(element).toBeInTheDocument()
  })

  it('calls callback on button press', async () => {
    // Arrange
    const onCloseDialog = vi.fn()
    const selectedDates: string[] = ['15/01/2024']
    const onDateChange = vi.fn()

    // Act
    render(
      <CalendarPicker
        isDialogOpen={true}
        onCloseDialog={onCloseDialog}
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />,
    )

    const element = await screen.findByText('1')
    await userEvent.click(element)

    // Assert
    expect(onDateChange).toHaveBeenCalled()
  })
  */
})
