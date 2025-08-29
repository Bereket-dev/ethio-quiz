import { ResponsivePie } from '@nivo/pie'

function PieChart({ pieData }) {
  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 30, right: 150, bottom: 30, left: 5 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={10}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          translateX: 130,
          itemWidth: 120,
          itemHeight: 30,
          padding: 5,
          itemDirection: 'left-to-right',
          symbolSize: 14,
          symbolShape: 'circle',
        },
      ]}
      theme={{
        legends: {
          text: {
            fontSize: 14,
            fill: '#333',
            fontWeight: 500,
          },
        },
      }}
    />
  )
}

export default PieChart
