import { ResponsiveBar } from '@nivo/bar'
import { useState, useEffect } from 'react'

function BarChart({ rawData }) {
  const [chartData, setChartData] = useState([])
  const [keys, setKeys] = useState([])

  useEffect(() => {
    if (!rawData || rawData.length === 0) return

    // Step 1: group by player
    const playerMap = {}
    
    const kingdomSet = new Set()

    rawData.forEach(({ player, kingdom, totalScore }) => {
      const kingdomKey = kingdom.toLowerCase() // normalize
      kingdomSet.add(kingdomKey)

      if (!playerMap[player]) playerMap[player] = { player }
      playerMap[player][kingdomKey] = totalScore
    })

    // Step 2: prepare chart data
    const formattedData = Object.values(playerMap)
    const kingdomKeys = Array.from(kingdomSet)

    setChartData(formattedData)
    setKeys(kingdomKeys)
  }, [rawData])
  return (
    <ResponsiveBar
      data={chartData}
      keys={keys}
      indexBy="player"
      margin={{ top: 40, right: 80, bottom: 50, left: 70 }}
      padding={0.3}
      valueScale={{ type: 'linear', nice: true }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'set2' }}
      enableGridX={false}
      gridYValues={5}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        renderTick: ({ x, y, value }) => (
          <g transform={`translate(${x},${y})`}>
            <text
              dy={16}
              textAnchor="middle"
              fill="#e5e7eb" // light gray for blue background
              style={{ fontSize: 11, fontWeight: 500 }}
            >
              {value}
            </text>
          </g>
        ),
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
        legend: 'Score',
        legendPosition: 'middle',
        legendOffset: -50,

        renderTick: ({ x, y, value }) => (
          <g transform={`translate(${x},${y})`}>
            <text
              x={-5}
              textAnchor="end"
              fill="#e5e7eb" // light gray
              style={{ fontSize: 11, fontWeight: 500 }}
            >
              {value}
            </text>
          </g>
        ),
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#f3f4f6" // very light gray for labels
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: '6px 10px',
            background: '#1e293b',
            color: '#f9fafb',
            borderRadius: '6px',
            fontSize: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          <strong style={{ color }}>{id}</strong>: {value}
        </div>
      )}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 50,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          symbolSize: 14,
          symbolShape: 'circle',
          itemTextColor: '#fff', // legend text light gray
        },
      ]}
      animate={true}
      motionConfig="gentle"
      theme={{
        axis: {
          domain: { line: { stroke: '#cbd5e1', strokeWidth: 1 } },
          ticks: { line: { stroke: '#cbd5e1', strokeWidth: 1 } },
          legend: {
            text: {
              fill: '#e5e7e0',
              fontSize: 12,
              fontWeight: 600,
            },
          },
        },
        grid: {
          line: {
            stroke: '#93c5fd',
            strokeWidth: 1,
            strokeDasharray: '4 4',
          },
        },
      }}
    />
  )
}

export default BarChart
