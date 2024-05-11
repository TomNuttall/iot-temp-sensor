import { getTemperatureColour } from '../../lib/Helpers'
import './TempCard.scss'

interface TempCardProps {
  temp: number
  timestamp: number
  title: string
  altDescription: string
}

const TempCard: React.FC<TempCardProps> = ({
  temp,
  timestamp,
  title,
  altDescription,
}) => {
  const dateObj = new Date(timestamp)

  //const date = dateObj.toLocaleDateString('en-GB')
  const time = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className="temp-card"
      style={{ borderColor: getTemperatureColour(temp) }}
      aria-live="polite"
      aria-label={`${altDescription} ${temp.toFixed(2)} degrees at ${time}`}
    >
      <div aria-hidden>
        <span className="temp-card__title">{title}</span>
        &nbsp;
        <span className="temp-card__time">{time}</span>
      </div>
      <p aria-hidden className="temp-card__temp">
        {temp.toFixed(2)}&deg;
      </p>
    </div>
  )
}

export default TempCard
