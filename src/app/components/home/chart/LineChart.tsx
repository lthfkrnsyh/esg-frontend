import React from "react";
import { Line } from "react-chartjs-2";
import { ArcElement, Tooltip } from "chart.js";
import Chart from "chart.js/auto";

export interface LineChartData {
  labels: string[];
  datasets: {
    data: number[];
    label: string;
    backgroundColor: string | string[]; // Allow string or array of strings
    borderColor?: string;
    borderWidth?: number;
  }[];
}

interface LineChartProps {
  data: LineChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  Chart.register(ArcElement, Tooltip);

  const options = {
    responsive: true,
    // Customize other options here (optional)
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
