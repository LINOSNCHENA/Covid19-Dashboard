'use client';

import { fetchCovidData } from '@/app/services/api';
import { ICovidData } from '@/app/services/interfaceX';
import Table from '@/app/components/Table';
import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState<ICovidData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await fetchCovidData();  
        setData(results);
      } catch (error) {
        setError('Error fetching data: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>COVID-19 Cases in England</h1>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {data.length > 0 && <Table data={data} />}
    </div>
  );
};

export default Home;
