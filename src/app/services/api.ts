// services/api.ts

import { ICovidData } from "./interfaceX";
import { PDFDocument, rgb } from "pdf-lib";

export const fetchCovidData = async (): Promise<ICovidData[]> => {
  const url =
    "https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_cases_casesByDay";
  const params = new URLSearchParams({
    page_size: "365",
    page: "2",
  });

  const response = await fetch(`${url}?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const records = data.results || [];
  return records.slice(0, 105);
};

// Function to generate PDF 
export const generateCovidDataPDF = async (
  data: ICovidData[]
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const { height } = page.getSize();
  const fontSize = 12;
  let yPosition = height - 50;

  page.drawText("Covid-19 Daily Cases Report - England", {
    x: 50,
    y: yPosition,
    size: 20,
    color: rgb(0, 0.53, 0.71),
  });

  yPosition -= 40; // down

  data.forEach((record, index) => {
    const date = record.date;
    const cases = record.metric_value;
    const age = record.age;
    const sex = record.sex;
    const epiweek = record.epiweek;
    const geography = record.geography;

    page.drawText(`Day ${index + 1}: Date: ${date}, Cases: ${cases}, Age: ${age}, Sex: ${sex} , EpicWeek: ${epiweek}, Geography: ${geography}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
    });

    yPosition -= 20; 
  });


  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
