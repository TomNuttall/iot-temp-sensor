import { useEffect, useState, useRef, useId } from 'react'
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
  const [selected, setSelected] = useState<Date[] | undefined>(
    selectedDates.map(
      (date: string): Date => parse(date, 'dd/MM/yyyy', new Date()),
    ),
  )
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogId = useId()
  const headerId = useId()

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

  useEffect(() => {
    setSelected(
      selectedDates.map(
        (date: string): Date => parse(date, 'dd/MM/yyyy', new Date()),
      ),
    )
  }, [selectedDates])

  const onSubmit = () => {
    onDateChange({
      date: selected
        ? selected.map((date: Date) => date.toLocaleDateString('en-GB'))
        : [],
    })
    onCloseDialog()
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
          <div className="calendar-picker__close">
            <button onClick={onCloseDialog}>X</button>
          </div>
          <DayPicker
            fromDate={RECORD_BEGIN}
            toDate={new Date()}
            weekStartsOn={1}
            mode="multiple"
            max={7}
            selected={selected}
            onSelect={setSelected}
          />
          <div className="calendar-picker__controls">
            <button onClick={onReset}>Reset</button>
            <button onClick={onSubmit}>Select</button>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default CalendarPicker
