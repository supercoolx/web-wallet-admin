import { ResponsiveLine, Serie, LineSvgProps } from '@nivo/line';
import React from 'react';

export interface ILineChartProps extends LineSvgProps {
  data: Serie[];
}

export default function LineChart({ data, ...rest }: ILineChartProps) {
  return (
    <ResponsiveLine
      data={data}
      enableArea
      curve="monotoneX"
      enableGridX={false}
      xScale={{
        type: 'point',
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      margin={{
        top: 32,
        bottom: 32,
        left: 40,
        right: 32,
      }}
      yFormat=" >-.2f"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      {...rest}
    />
  );
}
