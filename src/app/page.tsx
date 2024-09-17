'use client';

import { useEffect, useState } from 'react';

interface CovidData {
  date: string;
  value: number;
}

const Home = () => {
  const [data, setData] = useState<CovidData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = "https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_cases_casesByDay";

    const params = new URLSearchParams({
      page_size: '365',
      page: '2'
    });

    fetch(`${url}?${params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const results = data.results || [];
        setData(results);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
      });
  }, []);

  return (
    <div>
      <h1>COVID-19 Cases in England</h1>
      {error && <p>{error}</p>}
      {/* Display the JSON structure of data[1] if it exists */}
      {data[1] && (
        <pre>
          {JSON.stringify(data[1], null, 2)}
        </pre>
      )}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Date: {item.date}, Cases: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
