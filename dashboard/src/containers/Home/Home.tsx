import { useState } from 'react'
import { TempData, TempApi } from '../../lib/tempApi'
import { DateRangeOptions } from '../../components/DateRangePicker/DateRangePicker'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

export const Home = () => {
  const [tempData, setTempData] = useState<TempData[]>([])
  const [rangeOption, setRangeOption] = useState<DateRangeOptions>('Today')

  const onDateChange = async (
    from: number,
    to: number,
    rangeOption: DateRangeOptions,
  ) => {
    const data = await TempApi.get(from, to)

    setTempData(data)
    setRangeOption(rangeOption)
  }

  return (
    <div data-testid="home">
      <DateRangePicker onDateChange={onDateChange} />
      <SummaryOverview tempData={tempData} />
      <TempChart tempData={tempData} rangeOption={rangeOption} />
    </div>
  )
}

export default Home
