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
  ChartOptions,
  Filler,
} from 'chart.js';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatCurrency } from '../utils/format';
import { ChartBarIcon } from '@heroicons/react/24/outline';

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

interface StockChartProps {
  data: {
    labels: string[];
    prices: number[];
  };
  symbol: string;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y';

const generateTimeLabels = (range: TimeRange): string[] => {
  const now = new Date();
  const labels: string[] = [];
  
  switch (range) {
    case '1D':
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000);
        labels.push(time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      }
      break;
    case '1W':
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 86400000);
        labels.push(date.toLocaleDateString('en-IN', { weekday: 'short' }));
      }
      break;
    case '1M':
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 86400000);
        labels.push(date.toLocaleDateString('en-IN', { day: 'numeric' }));
      }
      break;
    case '3M':
      for (let i = 89; i >= 0; i -= 3) {
        const date = new Date(now.getTime() - i * 86400000);
        labels.push(date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
      }
      break;
    case '1Y':
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 30 * 86400000);
        labels.push(date.toLocaleDateString('en-IN', { month: 'short' }));
      }
      break;
  }
  
  return labels;
};

const generateMockPrices = (range: TimeRange): number[] => {
  const basePrice = 100;
  const prices: number[] = [];
  let volatility = 0;
  
  switch (range) {
    case '1D':
      volatility = 0.5;
      break;
    case '1W':
      volatility = 1;
      break;
    case '1M':
      volatility = 2;
      break;
    case '3M':
      volatility = 3;
      break;
    case '1Y':
      volatility = 5;
      break;
  }
  
  const count = range === '1D' ? 24 : range === '1W' ? 7 : range === '1M' ? 30 : range === '3M' ? 90 : 12;
  
  for (let i = 0; i < count; i++) {
    const randomChange = (Math.random() - 0.5) * volatility;
    prices.push(basePrice + randomChange);
  }
  
  return prices;
};

export default function StockChart({ data, symbol }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartData, setChartData] = useState({
    labels: generateTimeLabels('1M'),
    prices: generateMockPrices('1M'),
  });

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: chartData.prices,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `Price: ${formatCurrency(Number(value))}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: (value) => formatCurrency(Number(value)),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 w-full overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <ChartBarIcon className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Stock Performance</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{symbol}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['1D', '1W', '1M', '3M', '1Y'] as const).map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTimeRange(range);
                setChartData({
                  labels: generateTimeLabels(range),
                  prices: generateMockPrices(range),
                });
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="h-[600px] w-full overflow-x-auto bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        <div className="min-w-full h-full">
          <Line options={options} data={chartConfig} />
        </div>
      </div>
    </motion.div>
  );
}