'use client';

import React, { useState, useEffect } from 'react';
import { Button, Spin, Alert } from 'antd';
import ChartCard from './components/ContentArea'; 
import { ICovidData } from './services/interfaceX';
import { fetchCovidData, generateCovidDataPDF } from './services/api'; 
import { FaFilePdf, FaStickyNote, FaFilter } from 'react-icons/fa';

const PageHeader: React.FC<{ title: string }> = ({ title }) => (
  <header style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f2f5' }}>
    <h1>{title}</h1>
  </header>
);

const Panel: React.FC<{ onExportPDF: () => void }> = ({ onExportPDF }) => (
  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'pink' }}>
    <h2>Page Title | Data Seperator</h2>
    <div>
      <Button
        style={{ marginRight: '8px' }}
        icon={<FaFilePdf />}
        onClick={onExportPDF} // Trigger 
      >
        Export to PDF
      </Button>
      <Button style={{ marginRight: '8px' }} icon={<FaStickyNote />}>
        Notes
      </Button>
      <Button icon={<FaFilter />}>
        Filter
      </Button>
    </div>
  </div>
);

const Page: React.FC = () => {
  const [data, setData] = useState<ICovidData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const results = await fetchCovidData();
        setData(results);
        console.log(results);
      } catch (error) {
        setError('Error fetching data: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  const handleExportPDF = async () => {
    try {  
      const pdfBytes = await generateCovidDataPDF(data);

      // Create a Blob and trigger a download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'covid19_report.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <PageHeader title="Page Title | Mavin Project" />
      <Panel onExportPDF={handleExportPDF} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" />}
        {!loading && !error && (
          <>
            <ChartCard chartData={data} title="Charts Overview of Covid in England" />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
