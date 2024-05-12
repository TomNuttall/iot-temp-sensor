import { useContext } from 'react'
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  IPreferenceContext,
  PreferenceContext,
} from '../../context/PreferenceContext'
import { TemperatureSeries, TemperatureData } from '../../lib/IoTApi'
import { getTemperatureColour } from '../../lib/Helpers'
import { chartConfig } from './config'

import './TempChart.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

interface TempChartProps {
  tempData: TemperatureSeries[]
}

const TempChart: React.FC<TempChartProps> = ({ tempData }) => {
  const { noAnimate } = useContext<IPreferenceContext>(PreferenceContext)

  const multiSeries = tempData.length > 1
  const length = tempData.length > 0 ? tempData[0].values.length : 0
  const labels = Array(length)
    .fill(1)
    .map((_, index: number) => index)

  // labels: vals.map((x: TemperatureData) => {
  //   const timeStamp = new Date(x.time)
  //   return timeStamp.toLocaleTimeString('en-GB', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   })
  // }),

  const data: ChartData<'line'> = {
    labels,
    datasets: tempData.map((series: TemperatureSeries, index: number) => {
      return {
        label: `${series.date}`,
        data: series.values.map((data: TemperatureData) => data.temp),
        borderDash: [index, index],
        borderColor: multiSeries ? getTemperatureColour(index) : undefined,
        backgroundColor: multiSeries ? getTemperatureColour(index) : undefined,
        pointStyle: 'circle',
        pointRadius: 3,
        pointHoverRadius: 6,
        segment: {
          borderColor: (context: any) => {
            const value = multiSeries ? index : Math.floor(context?.p0?.raw)
            return getTemperatureColour(value)
          },
        },
      }
    }),
  }

  return (
    <div className="temp-chart" data-testid="temp-chart" aria-hidden>
      <Line
        options={{
          ...chartConfig,
          animation: {
            duration: noAnimate ? 0 : 1000,
          },
          plugins: {
            legend: {
              display: multiSeries,
              onClick: () => {},
              labels: {
                usePointStyle: true,
              },
              position: 'bottom',
            },
          },
        }}
        data={data}
      />
    </div>
  )
}

export default TempChart
