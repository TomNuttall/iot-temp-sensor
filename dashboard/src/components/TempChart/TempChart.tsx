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
import { TemperatureData } from '../../lib/IoTApi'
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
  tempData: TemperatureData[]
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

  const data = {
    labels: tempData.map((x) => {
      const timeStamp = new Date(x.time)
      return timeStamp.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }),
    datasets: [
      {
        label: 'Temp',
        data: tempData.map((x) => x.temp),
        segment: {
          borderColor: (context: any) => {
            const value = tempData[context['p0DataIndex']].temp
            return getTemperatureColour(Math.floor(value))
          },
        },
      },
    ],
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
