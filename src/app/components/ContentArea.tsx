// ChartCard.tsx

import React from 'react';
import { Card, Button } from 'antd';
import { ICovidData } from '../services/interfaceX';
import PieChartComponent from './PieChart';
import ColumsComponent from './ColumsChart';

const ChartCard: React.FC<{ chartData: ICovidData[]; title: string }> = ({ chartData, title }) => (
  <Card
    title={title}
    extra={<Button type="link">❤️</Button>} 
    style={{ width: '100%', marginBottom: '20px' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, marginRight: '10px', background: '#EFEBE9' }}>
        <h3>Bar Chart #1 {chartData.length}</h3>
        <ColumsComponent data={chartData} />
      </div>
      <div style={{ flex: 1, background: '#EFEBE9' }}>
        <h3>Pie Chart #2 {chartData.length}</h3>
        <PieChartComponent data={chartData} />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
      <Button style={{ background: '#4FC3F7' }}>Action</Button>
      <Button style={{ background: '#4FC3F7' }}>Action</Button>
    </div>
  </Card>
);

export default ChartCard;
