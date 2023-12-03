import { getTemperatureColour } from '../../lib/Helpers'
import './TempCard.scss'

interface TempCardProps {
  temp: number
  timestamp: number
  title: string
}

const TempCard: React.FC<TempCardProps> = ({ temp, timestamp, title }) => {
  const time = new Date(timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className="temp-card"
      style={{ backgroundColor: getTemperatureColour(temp) }}
    >
      <div>
        <span className="temp-card__title">{title}</span>
        &nbsp;
        <span className="temp-card__time">{time}</span>
      </div>
      <p className="temp-card__temp">{temp.toFixed(2)}</p>
      <div></div>
    </div>
  )
}

export default TempCard
