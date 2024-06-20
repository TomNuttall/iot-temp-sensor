import { getTemperatureColour } from '../../lib/Helpers'
import './TempCard.scss'

interface TempCardProps {
  temp: number | undefined
  timestamp: number | undefined
  title: string
  altDescription: string
}

const TempCard: React.FC<TempCardProps> = ({
  temp,
  timestamp,
  title,
  altDescription,
}) => {
  let time = ''
  let date = ''
  if (timestamp) {
    const dateObj = new Date(timestamp)
    date = dateObj.toLocaleDateString('en-GB')
    time = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  const borderColor: string = temp ? getTemperatureColour(temp) : ''
  const tempReading: string = temp ? temp.toFixed(2) : '0.00'
  const ariaLabel = `${altDescription} ${
    temp ? `${tempReading} degrees` : ''
  } at ${time} on ${date}`

  return (
    <div
      className="temp-card"
      style={{ borderColor }}
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div aria-hidden>
        <span className="temp-card__title">{title}</span>
        &nbsp;
        <span className="temp-card__time">{time}</span>
      </div>
      <p aria-hidden className="temp-card__temp">
        {tempReading}&deg;
      </p>
    </div>
  )
}

export default TempCard
