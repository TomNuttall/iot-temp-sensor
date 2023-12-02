import { getTemperatureColour } from '../../lib/Helpers'
import './TempCard.scss'

interface TempCardProps {
  temp: number
  title: string
}

const TempCard: React.FC<TempCardProps> = ({ temp, title }) => {
  return (
    <div
      className="temp-card"
      style={{ backgroundColor: getTemperatureColour(temp) }}
    >
      <p className="temp-card__title">{title}</p>
      <p className="temp-card__temp">{temp.toFixed(2)}</p>
      <div></div>
    </div>
  )
}

export default TempCard
