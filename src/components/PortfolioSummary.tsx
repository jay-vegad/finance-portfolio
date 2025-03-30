'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/format';
import { ArrowUpIcon, ArrowDownIcon, ChartBarIcon, CurrencyDollarIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface PortfolioSummaryProps {
  totalValue: number;
  dailyChange: number;
  totalStocks: number;
}

export default function PortfolioSummary({ totalValue, dailyChange, totalStocks }: PortfolioSummaryProps) {
  const changePercentage = (dailyChange / totalValue) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Portfolio Value</h3>
          <CurrencyDollarIcon className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalValue)}</p>
          <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">INR</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Daily Change</h3>
          {dailyChange >= 0 ? (
            <ArrowUpIcon className="w-5 h-5 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div className="flex items-baseline">
          <p className={`text-2xl font-semibold ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {dailyChange >= 0 ? '+' : ''}{formatCurrency(dailyChange)}
          </p>
          <p className={`ml-2 text-sm ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ({changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(2)}%)
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Stocks</h3>
          <ChartBarIcon className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalStocks}</p>
          <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">Holdings</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Value</h3>
          <BanknotesIcon className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatCurrency(totalValue / totalStocks)}
          </p>
          <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">per Stock</p>
        </div>
      </motion.div>
    </div>
  );
}