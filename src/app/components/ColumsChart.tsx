"use client";

import React, { useRef, useEffect } from "react";
import { Column } from "@antv/g2plot";
import { ChartProps } from "../services/interfaceX";

const ColumsComponent: React.FC<ChartProps> = ({ data }) => {
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

  return <div ref={chartContainerRef} style={{ height: "400px", background:'#B3E5FC' }} />;
};

export default ColumsComponent;
