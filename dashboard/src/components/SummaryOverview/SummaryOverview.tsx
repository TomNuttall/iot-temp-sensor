import { TemperatureData } from '../../lib/IoTApi'
import TempCard from '../TempCard'
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
  const current = tempData.at(-1)

  return (
    <div className="summary-overview">
      <TempCard temp={min?.temp ?? 0} title="Min" />
      <TempCard temp={max?.temp ?? 0} title="Max" />
      <TempCard temp={current?.temp ?? 0} title="Latest" />
    </div>
  )
}

export default SummaryOverview
