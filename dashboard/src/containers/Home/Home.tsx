import { useState } from 'react'
import { TempData, fetchTempData } from '../../helpers/tempApi'
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
    const data = await fetchTempData(from, to)
    setTempData(data)
    setRangeOption(rangeOption)
  }

  return (
    <>
      <DateRangePicker onDateChange={onDateChange} />
      <SummaryOverview tempData={tempData} rangeOption={rangeOption} />
      <TempChart tempData={tempData} />
    </>
  )
}

export default Home
