import { useState } from 'react'
import { TemperatureData, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Home.scss'

export const Home: React.FC = () => {
  const [tempData, setTempData] = useState<TemperatureData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const onDateChange = async (from: number, to: number) => {
    const data = await IoTApi.get(from, to)

    setTempData(data)
    setLoading(false)
  }

  return (
    <div data-testid="home" className="home">
      <SummaryOverview loading={loading} tempData={tempData} />

      <div className="home__panel">
        <TempChart tempData={tempData} />
        <DateRangePicker onDateChange={onDateChange} />
      </div>
    </div>
  )
}

export default Home
