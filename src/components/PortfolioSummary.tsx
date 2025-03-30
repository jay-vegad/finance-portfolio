'use client';

import { motion } from 'framer-motion';
import { formatCurrency, formatPercentage } from '@/utils/format';

interface PortfolioSummaryProps {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  activeStocks: number;
}

export default function PortfolioSummary({
  totalValue,
  dayChange,
  dayChangePercent,
  totalReturn,
  totalReturnPercent,
  activeStocks
}: PortfolioSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Here&apos;s how your portfolio is performing
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-semibold">₹{totalValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Day&apos;s Change</p>
          <p className={`text-2xl font-semibold ${dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {dayChange >= 0 ? '+' : ''}₹{Math.abs(dayChange).toLocaleString()} ({dayChangePercent.toFixed(2)}%)
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Return</p>
          <p className={`text-2xl font-semibold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalReturn >= 0 ? '+' : ''}₹{Math.abs(totalReturn).toLocaleString()} ({totalReturnPercent.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
}