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

interface TempData {
  date: string
  temp: string
}

interface TempChartProps {
  tempData: TempData[]
}

const TempChart = ({ tempData }: TempChartProps) => {
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

  const data = {
    labels: tempData.map((x) => x.date),
    datasets: [
      {
        label: 'Dataset 1',
        data: tempData.map((x) => x.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className="temp-chart">
      <Line options={options} data={data} />
    </div>
  )
}

export default TempChart
