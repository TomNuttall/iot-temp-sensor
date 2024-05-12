import { ChartOptions } from 'chart.js'

export const chartConfig: ChartOptions<'line'> = {
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
  // plugins: {
  //   legend: {
  //     onClick: () => {},
  //     labels: {
  //       usePointStyle: true,
  //     },
  //     position: 'bottom',
  //   },
  // },
}
