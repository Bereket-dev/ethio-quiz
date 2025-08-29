import React from 'react'
import { ResponsiveLine } from '@nivo/line'

function LineChart({ data }) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
      animate={false}
      xScale={{ type: 'point' }}
      xFormat={'time:%b'}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      curve="monotoneX" // smooth lines
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (value) => value,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Users',
        legendOffset: -50,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'category10' }} // vibrant colors
      pointSize={8}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
      lineWidth={3}
      enablePoints={true}
      enableArea={true} // adds nice gradient fill
      areaOpacity={0.1}
      useMesh={true}
      tooltip={({ point }) => (
        <div
          style={{
            background: 'white',
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <strong>{point.serieId}</strong>: {point.data.yFormatted}
        </div>
      )}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 4,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
        },
      ]}
      theme={{
        textColor: '#333',
        fontSize: 12,
        grid: {
          line: {
            stroke: '#e0e0e0',
            strokeWidth: 1,
          },
        },
      }}
    />
  )
}

export default LineChart
