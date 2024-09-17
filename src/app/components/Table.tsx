// table.tsx

'use client';

import React from 'react';
import { TableProps } from '../services/interfaceX';

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Geography</th>
          <th>Metric</th>
          <th>Cases</th>
          <th>In Reporting Delay Period</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.geography}</td>
            <td>{item.metric}</td>
            <td>{item.metric_value}</td>
            <td>{item.in_reporting_delay_period ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
