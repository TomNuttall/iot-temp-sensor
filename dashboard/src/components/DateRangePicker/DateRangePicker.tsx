import { useEffect, useState } from 'react'
import { startOfDay, endOfDay } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import './DateRangePicker.scss'

interface DateRangePickerProps {
  onDateChange: (from: number, to: number) => Promise<void>
}

const DateRangePicker = ({ onDateChange }: DateRangePickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>()
  const [rangeMessage, setRangeMessage] = useState<string>('')
  const [menuVisible, setMenuVisible] = useState<boolean>(false)

  useEffect(() => {
    dateSelect({ from: new Date() })
  }, [])

  useEffect(() => {
    if (!range) return

    dateSelect(range)
    setRangeMessage(
      `${range?.from ? range.from.toLocaleDateString() : ''} ${
        range?.to ? ` - ${range.to.toLocaleDateString()}` : ''
      }`,
    )
  }, [range])

  const dateSelect = (range: DateRange) => {
    if (range?.from === undefined) return

    let from = zonedTimeToUtc(startOfDay(range.from), 'Etc/UTC')
    let to = zonedTimeToUtc(endOfDay(range.to ?? range.from), 'Etc/UTC')

    onDateChange(from.valueOf(), to.valueOf())
  }

  return (
    <div className="date-range-picker">
      <button
        aria-haspopup="true"
        aria-expanded={menuVisible}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        Choose Date Range
      </button>
      {menuVisible && (
        <div className="date-range-picker__range" role="menu">
          <DayPicker
            weekStartsOn={1}
            mode="range"
            max={7}
            selected={range}
            onSelect={setRange}
            fromDate={new Date(2023, 4, 12)}
            toDate={new Date()}
          />
        </div>
      )}

      <p className="date-range-picker__summary">{rangeMessage}</p>
    </div>
  )
}

export default DateRangePicker
