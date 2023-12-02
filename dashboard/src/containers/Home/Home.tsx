import { useState } from 'react'
import { TemperatureData, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

import './Home.scss'

export const Home: React.FC = () => {
  const [tempData, setTempData] = useState<TemperatureData[]>([])

  const onDateChange = async (from: number, to: number) => {
    const data = await IoTApi.get(from, to)

    setTempData(data)
  }

  return (
    <div data-testid="home" className="home">
      <SummaryOverview tempData={tempData} />

      <div className="home__panel">
        <DateRangePicker onDateChange={onDateChange} />
        <TempChart tempData={tempData} />
      </div>
    </div>
  )
}

export default Home
