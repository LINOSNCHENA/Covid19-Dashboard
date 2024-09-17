// PieChart.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { Pie } from '@antv/g2plot';
import { PieChartProps } from '../services/interfaceX';

const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Pie | null>(null);

  useEffect(() => {
    if (chartRef.current) {

      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null; 
      }

      try {
        chartInstance.current = new Pie(chartRef.current, {
          data,
          angleField: 'metric_value',
          colorField: 'date',
          radius: 0.8,
          legend: {
            position: 'bottom',
          },
          tooltip: {
            formatter: (datum) => ({
              name: datum.date,
              value: datum.metric_value,
            }),
          },
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },
          interactions: [{ type: 'element-active' }],
        });

        chartInstance.current.render();
      } catch (error) {
        console.error('Error rendering pie chart:', error);
      }
    }

    return () => {
           if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null; // Clear the reference after destroying
      }
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px', background: '#FFF59D' }} />;
};

export default PieChartComponent;
