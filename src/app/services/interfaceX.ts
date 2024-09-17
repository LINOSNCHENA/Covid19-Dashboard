// Defination interface for the data structure

export interface ICovidData {
    theme: string;
    sub_theme: string;
    topic: string;
    geography_type: string;
    geography: string;
    geography_code: string;
    metric: string;
    metric_group: string;
    stratum: string;
    sex: string;
    age: string;
    year: number;
    month: number;
    epiweek: number;
    date: string;
    metric_value: number;
    in_reporting_delay_period: boolean;
  }

 export   interface TableProps {
    data: ICovidData[];
  }
export  interface ChartProps {
    data: ICovidData[];
  }

  export interface ChartProps {
    data: ICovidData[];
  }
  
  export interface PieChartProps {
    data: ICovidData[];
  }