'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartData
} from 'chart.js';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/format';
import { ChartContext } from '@/types';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioDistributionProps {
  labels: string[];
  values: number[];
}

export default function PortfolioDistribution({ labels, values }: PortfolioDistributionProps) {
  const data: ChartData<'doughnut'> = {
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
      borderWidth: 1,
      hoverOffset: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
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
    },
    animation: {
      animateScale: true,
      animateRotate: true
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
      <div className="h-[400px] flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </motion.div>
  );
}