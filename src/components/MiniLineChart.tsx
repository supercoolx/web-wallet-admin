import { ResponsiveLine, Serie, LineSvgProps } from '@nivo/line';
import React from 'react';

export interface IMiniLineChartProps extends LineSvgProps {
  data: Serie[];
}

export default function MiniLineChart({ data, ...rest }: IMiniLineChartProps) {
  return (
    <ResponsiveLine
      data={data}
      enableArea
      curve="monotoneX"
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      axisLeft={null}
      axisBottom={null}
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
        top: 2,
        bottom: 2,
      }}
      {...rest}
    />
  );
}
