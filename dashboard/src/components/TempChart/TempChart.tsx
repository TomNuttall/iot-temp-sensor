import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TemperatureSeries, TemperatureData } from '../../lib/IoTApi'
import { getTemperatureColour } from '../../lib/Helpers'

import './TempChart.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

// const options: ChartOptions<line> = {
const options = {
  maintainAspectRatio: false,
  aspectRatio: 1,
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.35,
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
}

interface TempChartProps {
  tempData: TemperatureSeries[]
}

const TempChart: React.FC<TempChartProps> = ({ tempData }) => {
  const [noAnimate, setNoAnimate] = useState<boolean>(true)

  useEffect(() => {
    const onMotionPreferenceChange = (e: { matches: boolean }) => {
      setNoAnimate(e.matches)
    }

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    setNoAnimate(motionPreference.matches)

    motionPreference.addEventListener('change', onMotionPreferenceChange)

    return () => {
      motionPreference.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

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

  const data = {
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
    <div className="temp-chart" data-testid="temp-chart">
      <Line
        options={{
          ...options,
          animation: {
            duration: noAnimate ? 0 : 1000,
          },
          plugins: {
            legend: {
              display: multiSeries,
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
