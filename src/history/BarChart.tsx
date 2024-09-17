// ChartCard.tsx

'use client';

import React, { useRef, useEffect } from 'react';
import { Bar } from '@antv/g2plot';
import { ChartProps } from '../app/services/interfaceX';


const BarChartComponent: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Bar | null>(null);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    if (chartContainer) {
 
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Bar(chartContainer, {
        data,
        yField: 'date',
        xField: 'metric_value',
        color: '#1890FF',
        yAxis: {
          title: {
            text: 'Date',
          },
        },
        xAxis: {
          title: {
            text: 'Metric Value',
          },
        },
        tooltip: {
          showMarkers: false,
        },
        label: {
          position: 'middle', 
        },
      });

      chartRef.current.render();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: '400px', background: 'green' }} />;
};

export default BarChartComponent;
