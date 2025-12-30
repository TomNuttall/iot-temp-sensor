import { useContext } from 'react'
import { format } from 'date-fns/format'
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  Point,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
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
  const { noAnimate, darkTheme } =
    useContext<IPreferenceContext>(PreferenceContext)

  const data: ChartData<'scatter'> = {
    datasets: tempData.map(
      (series: TemperatureSeries, index: number): ChartDataset<'scatter'> => {
        return {
          label: `${series.date}`,
          data: series.values.map((data: TemperatureData): Point => {
            const [hours, mins] = format(data.time, 'HH:mm').split(':')
            const time = Number(hours) * 60 + Number(mins)
            return { x: time, y: data.temp }
          }),
          backgroundColor: getTemperatureColour(index), // multiSeries ? getTemperatureColour(index) : undefined,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 6,
        }
      },
    ),
  }

  const formatToTime = (label: string | number): string => {
    const value = Number(label)
    const hour = Math.floor(value / 60)
    const min = Math.floor(value % 60)
    return `${hour.toString().padStart(2, '0')}:${min
      .toString()
      .padStart(2, '0')}`
  }

  const xAxisCallback = (label: string | number): string => {
    return formatToTime(label)
  }

  const tooltipLabelCallback = ({
    parsed,
    dataset,
  }: TooltipItem<'scatter'>): string | void => {
    if (!parsed.x || !parsed.y) return

    return `${dataset.label}: (${formatToTime(parsed.x)}, ${parsed.y.toFixed(
      2,
    )})`
  }

  const textColor = darkTheme ? 'rgba(244, 244, 244, 1)' : undefined
  const gridColor = darkTheme ? 'rgba(244, 244, 244, 0.2)' : undefined

  return (
    <div className="temp-chart" data-testid="temp-chart" aria-hidden>
      <Scatter
        options={{
          ...chartConfig,
          animation: {
            duration: noAnimate ? 0 : 1000,
          },
          scales: {
            x: {
              grid: {},
              ticks: {
                color: textColor,
                stepSize: 60,
                callback: xAxisCallback,
              },
            },
            y: {
              grid: {
                color: gridColor,
              },
              ticks: {
                color: textColor,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              onClick: () => undefined,
              labels: {
                color: textColor,
                usePointStyle: true,
              },
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: tooltipLabelCallback,
              },
            },
          },
        }}
        data={data}
      />
    </div>
  )
}

export default TempChart
