'use client';

import { motion } from 'framer-motion';
import { formatCurrency, formatPercentage } from '../utils/format';

export default function PortfolioSummary() {
  const summaryData = {
    totalValue: 2547892.50,
    todayChange: 45678.25,
    todayChangePercent: 1.82,
    totalReturn: 547892.50,
    totalReturnPercent: 27.4
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-6">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-gray-400 text-sm">Total Value</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(summaryData.totalValue)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Today's Change</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-green-500">
              {formatCurrency(summaryData.todayChange)}
            </p>
            <p className="ml-2 text-green-500">
              ({formatPercentage(summaryData.todayChangePercent)})
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Total Return</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-green-500">
              {formatCurrency(summaryData.totalReturn)}
            </p>
            <p className="ml-2 text-green-500">
              ({formatPercentage(summaryData.totalReturnPercent)})
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}