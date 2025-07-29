"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export const MarketSummary = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    async function fetchChartData() {
      const res = await fetch("/api/summary");
      const json = await res.json();
      setLabels(json.labels);
      setValues(json.values);
    }
    fetchChartData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "DAX Index",
        data: values,
        borderColor: "rgba(37, 99, 235, 0.8)",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Market Snapshot</h2>
      <Line data={data} />
      <p className="mt-4 text-sm text-gray-600">DAX performance this week</p>
    </div>
  );
};
