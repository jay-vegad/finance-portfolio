'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem
} from 'chart.js';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.7)'
    }]
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
      <div className="h-[400px]">
        <Bar 
          data={data} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const
              },
              title: {
                display: true,
                text: 'Market Trends by Sector'
              },
              tooltip: {
                callbacks: {
                  label: (context: TooltipItem<"bar">) => 
                    `Growth: ${context.parsed.y.toFixed(1)}%`
                }
              }
            }
          }}
        />
      </div>
    </motion.div>
  );
}