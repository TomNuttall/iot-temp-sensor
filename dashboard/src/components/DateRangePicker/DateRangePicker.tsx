import { useEffect } from 'react'
import { startOfDay, endOfDay, subDays, startOfHour } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import './DateRangePicker.scss'

interface DateRangePickerProps {
  onDateChange: (from: number, to: number) => Promise<void>
}

const DateRangePicker = ({ onDateChange }: DateRangePickerProps) => {
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

    onDateChange(from.valueOf(), to.valueOf())
  }

  return (
    <div className="date-range-picker">
      <div className="date-range-picker__buttons">
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
    </div>
  )
}

export default DateRangePicker
