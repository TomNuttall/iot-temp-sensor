import { useEffect } from 'react'
import { startOfDay, startOfHour, subDays } from 'date-fns'
import './DateRangePicker.css'

export type DateRangeOptions =
  | 'Today'
  | 'Yesterday'
  | 'Last 3 Days'
  | 'LastWeek'
  | 'All'

interface DateRangeProps {
  onDateChange: (
    from: number,
    to: number,
    rangeOption: DateRangeOptions,
  ) => Promise<void>
}

const DateRangePicker = ({ onDateChange }: DateRangeProps) => {
  useEffect(() => {
    dateSelect('Today')
  }, [])

  const dateSelect = (rangeOption: DateRangeOptions) => {
    let to = new Date()
    let from = new Date()

    switch (rangeOption) {
      case 'Today':
        to = startOfHour(to)
        from = startOfDay(from)
        break

      case 'Yesterday':
        to = startOfDay(to)
        from = startOfDay(subDays(from, 1))
        break

      case 'Last 3 Days':
        to = startOfHour(to)
        from = startOfDay(subDays(from, 2))
        break

      case 'LastWeek':
        to = startOfHour(to)
        from = startOfDay(subDays(from, 6))
        break

      case 'All':
        to = startOfHour(to)
        from = new Date(0)
        break
    }

    onDateChange(from.valueOf(), to.valueOf(), rangeOption)
  }

  return (
    <div className="date-range-picker">
      <button onClick={() => dateSelect('Today')}>Today</button>
      <button onClick={() => dateSelect('Yesterday')}>Yesterday</button>
      <button onClick={() => dateSelect('Last 3 Days')}>Last 3 Days</button>
      <button onClick={() => dateSelect('LastWeek')}>Last Week</button>
      <button onClick={() => dateSelect('All')}>All</button>
    </div>
  )
}

export default DateRangePicker
