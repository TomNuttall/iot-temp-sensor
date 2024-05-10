import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TemperatureSeries, IoTApi } from '../../lib/IoTApi'
import CalenderPicker from '../../components/CalenderPicker'
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
      let dates: string[] = searchParams.getAll('date')
      if (dates.length === 0) {
        dates.push(new Date().toLocaleDateString('en-GB'))
      }

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
        <div className="home__grid-a">
          <CalenderPicker
            date={searchParams.getAll('date')}
            onDateChange={setSearchParams}
          />
        </div>
        <div className="home__grid-b">
          <DateRangePicker onDateChange={setSearchParams} />
        </div>
        <div className="home__grid-c">
          <TempChart tempData={tempData} />
        </div>
      </div>
    </div>
  )
}

export default Home
