import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TemperatureData } from '../../lib/IoTApi'
import { DateRangeOptions } from '../DateRangePicker/DateRangePicker'
import './TempChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const options = {
  responsive: true,
  scales: {
    x: {
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
  rangeOption: DateRangeOptions
}

const TempChart = ({ tempData }: TempChartProps) => {
  const data = {
    labels: tempData.map((x) => new Date(x.time).getHours()),
    datasets: [
      {
        label: 'Temp',
        data: tempData.map((x) => x.temp),
        //fill: 'start',
        borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: (context: ScriptableContext<'line'>) => {
        //   const ctx = context.chart.ctx
        //   const gradient = ctx.createLinearGradient(
        //     0,
        //     0,
        //     0,
        //     context.chart.height,
        //   )
        //   gradient.addColorStop(0, 'rgba(255, 0, 0, 0.35)')
        //   gradient.addColorStop(1, 'rgba(0, 0, 255, 0.35)')
        //   return gradient
        // },
      },
    ],
  }

  return (
    <div className="temp-chart" data-testid="temp-chart">
      <Line options={options} data={data} />
    </div>
  )
}

export default TempChart
