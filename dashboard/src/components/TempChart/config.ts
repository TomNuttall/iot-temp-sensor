import { ChartOptions } from 'chart.js'

export const chartConfig: ChartOptions<'scatter'> = {
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

  elements: {
    line: {
      tension: 0.35,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
}
