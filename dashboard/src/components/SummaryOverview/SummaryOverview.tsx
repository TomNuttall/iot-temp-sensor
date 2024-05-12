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
            temp={min?.temp}
            timestamp={min?.time}
            title="Min"
            altDescription="Minimum Temperature"
          />
          <TempCard
            temp={max?.temp}
            timestamp={max?.time}
            title="Max"
            altDescription="Maximum Temperature"
          />
          <TempCard
            temp={current?.temp}
            timestamp={current?.time}
            title="Latest"
            altDescription="Latest Temperature"
          />
        </div>
      )}
    </>
  )
}

export default SummaryOverview
