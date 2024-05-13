import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { TemperatureSeries, IoTApi } from '../../lib/IoTApi'
import DateRangePicker from '../../components/DateRangePicker'
import SummaryOverview from '../../components/SummaryOverview'
import TempChart from '../../components/TempChart'

import './Home.scss'

export const Home: React.FC = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  let selectedDates: string[] = searchParams.getAll('date')
  if (firstLoad && selectedDates.length === 0) {
    selectedDates = [new Date().toLocaleDateString()]
    setFirstLoad(false)
  }

  const { isLoading, data } = useQuery<TemperatureSeries[] | undefined>({
    queryKey: selectedDates,
    queryFn: () => IoTApi.get(selectedDates),
  })

  return (
    <div className="home" data-testid="home">
      <SummaryOverview loading={isLoading} tempData={data ?? []} />

      <div className="home__panel">
        <TempChart tempData={data ?? []} />

        <DateRangePicker
          selectedDates={selectedDates}
          onDateChange={setSearchParams}
        />
      </div>
    </div>
  )
}

export default Home
