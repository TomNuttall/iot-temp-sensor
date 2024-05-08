import { useState } from 'react'
import { TemperatureSeries, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

import './Home.scss'

export const Home: React.FC = () => {
  const [tempData, setTempData] = useState<TemperatureSeries[]>([])
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
