'use client';

import { useEffect, useState } from 'react';
import { Table, Spin, Alert, Layout, Button } from 'antd'; 
import { ICovidData } from '@/app/services/interfaceX';
import { fetchCovidData } from '@/app/services/api';
const { Content } = Layout; 

const Home = () => {
  const [data, setData] = useState<ICovidData[]>([]);
  const [dataSize, setDataSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await fetchCovidData();
        setData(results);
        setDataSize(results.length);
      } catch (error) {
        setError('Error fetching data: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Cases', dataIndex: 'cases', key: 'cases' },
    { title: 'Epiweek', dataIndex: 'epiweek', key: 'epiweek' },
    { title: 'Sex', dataIndex: 'sex', key: 'sex' },
    { title: 'Geography_type', dataIndex: 'geography_type', key: 'geography-type' },
    { title: 'Geography', dataIndex: 'geography', key: 'geography' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'green' }}> 
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>COVID-19 Cases in England ({dataSize})</h2>
        
        {loading && <Spin size="large" />} {/* Loading spinner */}
        
        {error && <Alert message="Error" description={error} type="error" showIcon />} 
        
        {!loading && !error && (
          <>
            <Table dataSource={data} columns={columns} rowKey="date" pagination={false} />
            <Button type="primary" style={{ marginTop: '20px' }}>Refresh Data</Button> 
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Home;
