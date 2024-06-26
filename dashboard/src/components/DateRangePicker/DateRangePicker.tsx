import { useEffect, useState, useRef } from 'react'
import { subDays } from 'date-fns'
import CalendarPicker from '../CalendarPicker'
import './DateRangePicker.scss'

interface DateRangePickerProps {
  selectedDates: string[]
  onDateChange: (params: { date: string[] }) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDates,
  onDateChange,
}) => {
  const [activeButton, setActiveButton] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    ref?.current?.focus()
  }, [ref])

  return (
    <div className="date-range-picker">
      <div
        className="date-range-picker__button-group"
        role="group"
        aria-label="Date range buttons"
      >
        <button
          className={`date-range-picker__button ${
            activeButton === 'Today' ? 'date-range-picker__active' : ''
          }`}
          onClick={() => {
            setActiveButton('Today')
            onDateChange({ date: [new Date().toLocaleDateString('en-GB')] })
          }}
          ref={ref}
        >
          Today
        </button>
        <button
          className={`date-range-picker__button ${
            activeButton === 'Yesterday' ? 'date-range-picker__active' : ''
          }`}
          onClick={() => {
            setActiveButton('Yesterday')
            onDateChange({
              date: [subDays(new Date(), 1).toLocaleDateString('en-GB')],
            })
          }}
        >
          Yesterday
        </button>
        <button
          className={`date-range-picker__button ${
            activeButton === 'Last Week' ? 'date-range-picker__active' : ''
          }`}
          onClick={() => {
            setActiveButton('Last Week')
            onDateChange({
              date: new Array(7)
                .fill(0)
                .map((_, index: number) =>
                  subDays(new Date(), index).toLocaleDateString('en-GB'),
                )
                .reverse(),
            })
          }}
        >
          Last Week
        </button>
        <button
          className="date-range-picker__button"
          onClick={() => {
            setActiveButton('')
            setIsDialogOpen(true)
          }}
        >
          Select Dates
        </button>
      </div>

      <CalendarPicker
        isDialogOpen={isDialogOpen}
        onCloseDialog={() => setIsDialogOpen(false)}
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />
    </div>
  )
}

export default DateRangePicker
