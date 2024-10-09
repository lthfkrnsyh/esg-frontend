import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import plugin ChartDataLabels
import { ChartOptions } from "chart.js";

// Register the necessary components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export interface BarChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string;
    borderWidth?: number;
    label?: string;
  }[];
}

interface BarChartProps {
  data: BarChartData;
  options?: ChartOptions<'bar'>;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
