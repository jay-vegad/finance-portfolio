'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, TooltipItem } from 'chart.js';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/format';
import { ChartContext } from '@/types';

interface PortfolioDistributionProps {
  labels: string[];
  values: number[];
}

export default function PortfolioDistribution({ labels, values }: PortfolioDistributionProps) {
  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)', // blue
        'rgba(16, 185, 129, 0.8)', // green
        'rgba(245, 158, 11, 0.8)', // yellow
        'rgba(239, 68, 68, 0.8)',  // red
        'rgba(167, 139, 250, 0.8)' // purple
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(167, 139, 250, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: TooltipItem<"doughnut">) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const value = dataset.data[tooltipItem.dataIndex] as number;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">Portfolio Distribution</h2>
      <div className="h-[400px]">
        <Doughnut data={data} options={options} />
      </div>
    </motion.div>
  );
}