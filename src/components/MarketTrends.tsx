'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/format';

interface MarketTrendsProps {
  sectors: string[];
  growth: number[];
}

export default function MarketTrends({ sectors, growth }: MarketTrendsProps) {
  const data = {
    labels: sectors,
    datasets: [{
      label: 'Sector Growth (%)',
      data: growth,
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Market Trends by Sector'
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <Bar data={data} options={options} />
    </motion.div>
  );
} 