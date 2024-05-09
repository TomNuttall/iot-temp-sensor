import { useEffect, useState, useRef } from 'react'
import { subDays } from 'date-fns'
import './DateRangePicker.scss'

interface DateRangePickerProps {
  onDateChange: (params: { date: string[] }) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [activeButton, setActiveButton] = useState<string>('Today')

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
                ),
            })
          }}
        >
          Last Week
        </button>
      </div>
    </div>
  )
}

export default DateRangePicker
