import { DayPicker } from 'react-day-picker'
import { parse } from 'date-fns/parse'
import 'react-day-picker/dist/style.css'
import './CalenderPicker.scss'

interface CalenderPickerProps {
  date: string[]
  onDateChange: (params: { date: string[] }) => void
}

const CalenderPicker: React.FC<CalenderPickerProps> = ({
  date,
  onDateChange,
}) => {
  const selected = date?.map((date: string) => {
    const time = parse(date, 'dd/MM/yyyy', new Date())
    return new Date(time)
  })

  const setSelected = (dates: Date[] | undefined) => {
    if (!dates) return

    onDateChange({
      date: dates.map((date: Date) => date.toLocaleDateString('en-GB')),
    })
  }

  return (
    <div className="calender-picker">
      <DayPicker
        mode="multiple"
        max={7}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

export default CalenderPicker
