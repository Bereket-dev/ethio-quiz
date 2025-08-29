import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function DoughnutChart({ score, color }) {
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')

    const data = {
      datasets: [
        {
          data: [score.result, score.outOf - score.result],
          backgroundColor: [color.bolder, color.lighter],
        },
      ],
    }

    const config = {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    }

    const chart = new Chart(ctx, config)

    return () => {
      chart.destroy() // Cleanup on unmount
    }
  }, [score, color])

  return <canvas ref={chartRef}></canvas>
}

export default DoughnutChart
