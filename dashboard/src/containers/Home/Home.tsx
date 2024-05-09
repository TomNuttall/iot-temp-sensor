import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TemperatureSeries, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

import './Home.scss'

export const Home: React.FC = () => {
  const [tempData, setTempData] = useState<TemperatureSeries[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const getData = async () => {
      const dates = searchParams.getAll('date') ?? [
        new Date().toLocaleDateString('en-GB'),
      ]
      const data = await IoTApi.get(dates)

      setTempData(data)
      setLoading(false)
    }

    getData()
  }, [searchParams])

  return (
    <div data-testid="home" className="home">
      <SummaryOverview loading={loading} tempData={tempData} />

      <div className="home__panel">
        <TempChart tempData={tempData} />
        <DateRangePicker onDateChange={setSearchParams} />
      </div>
    </div>
  )
}

export default Home
