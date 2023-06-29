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
import { TempData } from '../../lib/TempApi'
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
)

const options = {
  responsive: true,
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
  tempData: TempData[]
  rangeOption: DateRangeOptions
}

const TempChart = ({ tempData }: TempChartProps) => {
  const labels = tempData.map((x) => new Date(x.time).getHours())
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temp',
        data: tempData.map((x) => x.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
