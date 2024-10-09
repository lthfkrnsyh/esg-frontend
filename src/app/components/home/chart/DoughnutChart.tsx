import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Chart } from "chart.js"; // Register elements

export interface DoughnutChartData {
  labels: string[];
  datasets: { data: number[]; label: string; backgroundColor: string[] }[];
}

interface DoughnutChartProps {
  data: DoughnutChartData;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  Chart.register(ArcElement, Tooltip ); // Register elements

  const options = {
    responsive: true, // Makes chart responsive to screen size
    // Customize other options here (optional)
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
