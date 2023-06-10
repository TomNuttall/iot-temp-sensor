import { TempData } from '../../lib/tempApi'
import './SummaryOverview.css'

interface SummaryOverviewProps {
  tempData: TempData[]
}

const SummaryOverview = ({ tempData }: SummaryOverviewProps) => {
  const temps = tempData?.slice()?.sort((a: TempData, b: TempData): number => {
    return a.temp - b.temp
  })

  const min = temps.at(0)
  const max = temps.at(-1)

  return (
    <div className="summary-overview">
      <div className="summary-overview__label summary-overview__min">
        {`Min ${min?.temp ? min.temp.toFixed(2) : 0}`}
      </div>
      <div className="summary-overview__label summary-overview__max">
        {`Max ${max?.temp ? max.temp.toFixed(2) : 0}`}
      </div>
    </div>
  )
}

export default SummaryOverview
