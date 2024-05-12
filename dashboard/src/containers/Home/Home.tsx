import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TemperatureSeries, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

import './Home.scss'

export const Home: React.FC = () => {
  const [tempData, setTempData] = useState<TemperatureSeries[]>([])
  const [filteredTempData, setFilteredTempData] = useState<TemperatureSeries[]>(
    [],
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const getData = async () => {
      let dates: string[] = searchParams.getAll('date')
      if (dates.length === 0) {
        if (!loading) {
          setTempData([])
          setFilteredTempData([])
          return
        }

        dates.push(new Date().toLocaleDateString('en-GB'))
      }

      const data = await IoTApi.get(dates)

      setTempData(data)
      setFilteredTempData(data)
      setLoading(false)
    }

    getData()
  }, [searchParams])

  const selectedDates = searchParams.getAll('date')

  return (
    <div className="home" data-testid="home">
      <SummaryOverview loading={loading} tempData={filteredTempData} />

      <div className="home__panel">
        <TempChart
          tempData={tempData}
          setFilteredTempData={setFilteredTempData}
        />

        <DateRangePicker
          selectedDates={selectedDates}
          onDateChange={setSearchParams}
        />
      </div>
    </div>
  )
}

export default Home
