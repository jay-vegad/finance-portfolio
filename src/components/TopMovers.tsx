'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TopMoversProps {
  labels: string[];
  stocks: {
    name: string;
    data: number[];
  }[];
}

export default function TopMovers({ labels, stocks }: TopMoversProps) {
  const data = {
    labels: ['9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30'],
    datasets: [
      {
        label: 'RELIANCE',
        data: [100, 105, 103, 107, 109, 108, 110],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      {
        label: 'TCS',
        data: [100, 102, 104, 103, 106, 108, 107],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
      {
        label: 'INFY',
        data: [100, 98, 99, 101, 103, 102, 104],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          callback: (value: any) => `${value}%`
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4">Top Movers Today</h2>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-4">Top Movers</h3>
        <div className="space-y-4">
          {stocks.map((stock) => (
            <div 
              key={stock.name}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{stock.name}</p>
                <p className="text-sm text-gray-500">
                  {stock.data[stock.data.length - 1].toFixed(2)}%
                </p>
              </div>
              <div className={`text-right ${stock.data[stock.data.length - 1] >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.data[stock.data.length - 1] > 0 ? '+' : ''}
                {stock.data[stock.data.length - 1].toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 