import { TempData } from '../../helpers/tempApi'
import { DateRangeOptions } from '../DateRangePicker/DateRangePicker'
import './SummaryOverview.css'

interface SummaryOverviewProps {
  tempData: TempData[]
  rangeOption: DateRangeOptions
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
        {`Min ${min?.temp.toFixed(2)}`}
      </div>
      <div className="summary-overview__label summary-overview__max">
        {`Max ${max?.temp.toFixed(2)}`}
      </div>
    </div>
  )
}

export default SummaryOverview
