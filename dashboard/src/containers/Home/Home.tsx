import { useState } from 'react'
import { TemperatureData, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

export const Home: React.FC = () => {
  const [tempData, setTempData] = useState<TemperatureData[]>([])

  const onDateChange = async (from: number, to: number) => {
    const data = await IoTApi.get(from, to)

    setTempData(data)
  }

  return (
    <div data-testid="home">
      <DateRangePicker onDateChange={onDateChange} />
      <SummaryOverview tempData={tempData} />
      <TempChart tempData={tempData} />
    </div>
  )
}

export default Home
