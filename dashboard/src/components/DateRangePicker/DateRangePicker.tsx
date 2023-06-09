import { useEffect } from 'react'
import { subDays, subHours, subMinutes } from 'date-fns'
import './DateRangePicker.css'

export type DateRangeOptions =
  | 'Today'
  | 'Yesterday'
  | 'LastWeek'
  | 'PreviousWeek'
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
        to = subMinutes(to, to.getMinutes())
        from = subHours(from, from.getHours())
        break

      case 'Yesterday':
        to = subHours(to, to.getHours())
        from = subDays(to, 1)
        break

      case 'LastWeek':
        to = subMinutes(to, to.getMinutes())
        from = subDays(from, 7)
        break

      case 'PreviousWeek':
        to = subDays(to, 7)
        from = subDays(from, 14)
        break

      case 'All':
        to = subMinutes(to, to.getMinutes())
        from = new Date(0)
        break
    }

    onDateChange(from.valueOf(), to.valueOf(), rangeOption)
  }

  return (
    <div className="date-range-picker">
      <button onClick={() => dateSelect('Today')}>Today</button>
      <button onClick={() => dateSelect('Yesterday')}>Yesterday</button>
      <button onClick={() => dateSelect('LastWeek')}>Last Week</button>
      <button onClick={() => dateSelect('PreviousWeek')}>Previous Week</button>
      <button onClick={() => dateSelect('All')}>All</button>
    </div>
  )
}

export default DateRangePicker
