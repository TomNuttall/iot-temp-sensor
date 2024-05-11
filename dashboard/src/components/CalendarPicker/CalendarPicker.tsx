import { useEffect, useRef, useId } from 'react'
import { DayPicker } from 'react-day-picker'
import { parse } from 'date-fns/parse'
import 'react-day-picker/dist/style.css'
import './CalendarPicker.scss'

const RECORD_BEGIN = new Date('2023-05-12')

interface CalendarPickerProps {
  isDialogOpen: boolean
  onCloseDialog: () => void
  selectedDates: string[]
  onDateChange: (params: { date: string[] }) => void
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  isDialogOpen,
  onCloseDialog,
  selectedDates,
  onDateChange,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogId = useId()
  const headerId = useId()

  const selected = selectedDates.map((date: string) => {
    const time = parse(date, 'dd/MM/yyyy', new Date())
    return new Date(time)
  })

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }

    if (!dialogRef.current) return

    if (isDialogOpen) {
      handleBodyScroll(true)
      dialogRef.current.showModal()
    } else {
      handleBodyScroll(false)
      dialogRef.current.close()
    }

    return () => {
      handleBodyScroll(false)
    }
  }, [isDialogOpen])

  const onSelect = (dates: Date[] | undefined) => {
    if (!dates) return

    onDateChange({
      date: dates.map((date: Date) => date.toLocaleDateString('en-GB')),
    })
  }

  const onReset = () => {
    onDateChange({ date: [] })
  }

  return (
    <div className="calendar-picker">
      {isDialogOpen && (
        <dialog
          role="dialog"
          ref={dialogRef}
          id={dialogId}
          aria-modal
          aria-labelledby={headerId}
          onClose={onCloseDialog}
        >
          <DayPicker
            fromDate={RECORD_BEGIN}
            toDate={new Date()}
            weekStartsOn={1}
            mode="multiple"
            max={7}
            selected={selected}
            onSelect={onSelect}
          />
          <div className="calendar-picker__controls">
            <button onClick={onReset}>Reset</button>
            <button onClick={onCloseDialog}>Close</button>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default CalendarPicker
