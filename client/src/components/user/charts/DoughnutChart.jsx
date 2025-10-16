import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function lightenColor(hex, percent) {
  if (!hex) return '#fff' // fallback if undefined

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const num = parseInt(hex, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff

  r = Math.min(255, Math.floor(r + (255 - r) * percent))
  g = Math.min(255, Math.floor(g + (255 - g) * percent))
  b = Math.min(255, Math.floor(b + (255 - b) * percent))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function DoughnutChart({ score, boldColor }) {
  const chartRef = useRef(null)

  const safeBoldColor = boldColor || '#0ff'
  const lightColor = lightenColor(safeBoldColor, 0.5)

  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current.getContext('2d')

    const data = {
      datasets: [
        {
          data: [score.result, score.outOf - score.result],
          backgroundColor: [safeBoldColor, lightColor],
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

    return () => chart.destroy()
  }, [score, safeBoldColor, lightColor])

  return <canvas ref={chartRef}></canvas>
}

export default DoughnutChart
