import { useEffect, useState } from 'react'
import { startOfDay, endOfDay, subDays, startOfHour } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import './DateRangePicker.scss'

interface DateRangePickerProps {
  onDateChange: (from: number, to: number) => Promise<void>
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [fromDate, setFromDate] = useState<Date>(new Date())
  const [toDate, setToDate] = useState<Date>(new Date())

  useEffect(() => {
    dateSelect({ from: new Date() })
  }, [])

  const dateSelect = (range: { from?: Date; to?: Date }) => {
    if (range?.from === undefined) return

    let from = zonedTimeToUtc(startOfDay(range.from), 'Etc/UTC')
    let to = zonedTimeToUtc(
      range.to ? endOfDay(range.to) : startOfHour(range.from),
      'Etc/UTC',
    )

    setFromDate(from)
    setToDate(to)
    onDateChange(from.valueOf(), to.valueOf())
  }

  const fromDateString = fromDate.toLocaleDateString()
  const toDateString = toDate.toLocaleDateString()
  return (
    <div className="date-range-picker">
      <div className="date-range-picker__overview">
        <p className="date-range-picker__title">Date Temp</p>
        <p className="date-range-picker__date">{`${
          fromDateString === toDateString
            ? fromDateString
            : `${fromDateString} - ${toDateString}`
        }`}</p>
      </div>
      <div
        className="date-range-picker__button-group"
        role="group"
        aria-label="Date range buttons"
      >
        <button
          className="date-range-picker__button"
          onClick={() => dateSelect({ from: new Date() })}
        >
          Today
        </button>
        <button
          className="date-range-picker__button"
          onClick={() =>
            dateSelect({
              from: subDays(new Date(), 1),
              to: subDays(new Date(), 1),
            })
          }
        >
          Yesterday
        </button>
        <button
          className="date-range-picker__button"
          onClick={() =>
            dateSelect({ from: subDays(new Date(), 6), to: new Date() })
          }
        >
          Last Week
        </button>
      </div>
    </div>
  )
}

export default DateRangePicker
