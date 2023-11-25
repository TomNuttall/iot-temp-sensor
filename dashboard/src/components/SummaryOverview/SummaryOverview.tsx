import { TemperatureData } from '../../lib/IoTApi'
import { getTemperatureColour } from '../../lib/Helpers'
import './SummaryOverview.scss'

interface SummaryOverviewProps {
  tempData: TemperatureData[]
}

const SummaryOverview: React.FC<SummaryOverviewProps> = ({ tempData }) => {
  const temps = tempData
    ?.slice()
    ?.sort((a: TemperatureData, b: TemperatureData): number => {
      return a.temp - b.temp
    })

  const min = temps.at(0)
  const max = temps.at(-1)

  return (
    <div className="summary-overview">
      <div
        className="summary-overview__label"
        style={{ backgroundColor: getTemperatureColour(min?.temp ?? 0) }}
      >
        {`Min ${min?.temp ? min.temp.toFixed(2) : 0}`}
      </div>
      <div
        className="summary-overview__label"
        style={{ backgroundColor: getTemperatureColour(max?.temp ?? 0) }}
      >
        {`Max ${max?.temp ? max.temp.toFixed(2) : 0}`}
      </div>
    </div>
  )
}

export default SummaryOverview
