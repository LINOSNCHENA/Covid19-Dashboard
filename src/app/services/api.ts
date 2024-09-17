// services/api.ts

import { ICovidData } from "./interfaceX";

export const fetchCovidData = async (): Promise<ICovidData[]> => {
    const url = "https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_cases_casesByDay";
    const params = new URLSearchParams({
      page_size: '365',
      page: '2'
    });
  
    const response = await fetch(`${url}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
       // Extract the first 20 records
       const records = data.results || [];
       return records.slice(0, 15);
  };
  