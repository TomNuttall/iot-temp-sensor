import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
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
  Title,
  Tooltip,
  Legend,
)

const options = {
  maintainAspectRatio: false,
  aspectRatio: 1,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.35,
    },
  },
  interaction: {
    intersect: true,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      y: {
        display: false,
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

  // const labels = [time.map((x) => {
  //   const timeStamp = new Date(x.time)
  //   return timeStamp.toLocaleTimeString('en-GB', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   })
  // })]
  const labels = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]

  const vals = tempData.length > 0 ? tempData[0].values : []
  const data = {
    labels,
    // labels: vals.map((x: TemperatureData) => {
    //   const timeStamp = new Date(x.time)
    //   return timeStamp.toLocaleTimeString('en-GB', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //   })
    // }),
    datasets: tempData.map((series: TemperatureSeries) => {
      return {
        label: series.date,
        data: series.values.map((data: TemperatureData) => data.temp),
        segment: {
          borderColor: (context: any) => {
            const value = Math.floor(context?.p0?.raw)
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
        }}
        data={data}
      />
    </div>
  )
}

export default TempChart
