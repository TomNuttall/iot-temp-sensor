import { TemperatureSeries, TemperatureData } from '../../lib/IoTApi'
import TempCard from '../TempCard'
import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import './SummaryOverview.scss'

interface SummaryOverviewProps {
  loading: boolean
  tempData: TemperatureSeries[]
}

const SummaryOverview: React.FC<SummaryOverviewProps> = ({
  loading,
  tempData,
}) => {
  const flatData = tempData.flatMap(
    (tempData: TemperatureSeries) => tempData.values,
  )
  const temps = flatData
    ?.slice()
    ?.sort((a: TemperatureData, b: TemperatureData): number => {
      return a.temp - b.temp
    })

  const min = temps.at(0)
  const max = temps.at(-1)
  const current = flatData.at(-1)

  return (
    <>
      {loading ? (
        <div
          data-testid="summary-overview-loading"
          className="summary-overview"
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="summary-overview">
          <TempCard
            temp={min?.temp ?? 0}
            timestamp={min?.time ?? 0}
            title="Min"
          />
          <TempCard
            temp={max?.temp ?? 0}
            timestamp={max?.time ?? 0}
            title="Max"
          />
          <TempCard
            temp={current?.temp ?? 0}
            timestamp={current?.time ?? 0}
            title="Latest"
          />
        </div>
      )}
    </>
  )
}

export default SummaryOverview
