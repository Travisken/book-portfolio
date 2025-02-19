import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnalyticsChartProps {
  downloadCount: number;
}

export default function AnalyticsChart({ downloadCount }: AnalyticsChartProps) {
  const data = {
    labels: ["Downloads", "Remaining", "Others"],
    datasets: [
      {
        data: [downloadCount, 1000 - downloadCount, 200], // Adjusted example data
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return <Doughnut data={data} />;
}
