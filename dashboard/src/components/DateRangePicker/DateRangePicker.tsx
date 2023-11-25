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

  return (
    <div className="date-range-picker">
      <h2 className="date-range-picker__title">Select Date Range</h2>
      <div
        className="date-range-picker__buttons"
        role="group"
        aria-label="Date range buttons"
      >
        <button onClick={() => dateSelect({ from: new Date() })}>Today</button>
        <button
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
          onClick={() =>
            dateSelect({ from: subDays(new Date(), 6), to: new Date() })
          }
        >
          Last Week
        </button>
      </div>
      <p className="date-range-picker__date">{`${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`}</p>
    </div>
  )
}

export default DateRangePicker
