"use client";

import React, { useRef, useEffect } from "react";
import { Column } from "@antv/g2plot";
import { Avatar } from "antd";
import { ChartProps } from "../services/interfaceX";

const ColumnsComponent: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Column | null>(null);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    if (chartContainer) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Column(chartContainer, {
        data,
        xField: "date",
        yField: "metric_value",
        color: "#1890FF",
        xAxis: {
          title: {
            text: "Date",
          },
        },
        yAxis: {
          title: {
            text: "Metric Value",
          },
        },
        tooltip: {
          showMarkers: false,
        },
        label: {
          position: "middle",
        },
        animation: {
          appear: {
            animation: "zoom-in",
            duration: 800,
          },
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

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }


  return (
    <div style={{ position: 'relative', width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
 
      <div ref={chartContainerRef} style={{ height: '90%', background: '#B3E5FC', width: '100%' }} />
  

      <div style={{
        position: 'absolute',
        bottom: '10px', 
        left: '10px',
      }}>
        <Avatar size={64} src="/Avatar/A.jpg" />
      </div>
    </div>
  );
  
};

export default ColumnsComponent;
