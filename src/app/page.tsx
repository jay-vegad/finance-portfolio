'use client';

import { motion } from 'framer-motion';
import StockChart from '@/components/StockChart';
import StockList from '@/components/StockList';
import PortfolioSummary from '@/components/PortfolioSummary';
import PortfolioDistribution from '@/components/PortfolioDistribution';
import MarketTrends from '@/components/MarketTrends';
import TopMovers from '@/components/TopMovers';

// Sample data - replace with real data
const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [100000, 120000, 115000, 130000, 140000, 135000],
  returns: [0, 20000, 15000, 30000, 40000, 35000],
};

const distributionData = {
  labels: ['Technology', 'Finance', 'Healthcare', 'Consumer', 'Energy'],
  values: [50000, 30000, 25000, 20000, 15000],
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Top Row - Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PortfolioSummary />
          </div>
          <div>
            <motion.div
              className="bg-gray-800 rounded-xl p-6 shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Day's Gain</span>
                  <span className="text-green-500">+₹12,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Total P&L</span>
                  <span className="text-green-500">+₹1,24,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Stocks</span>
                  <span>15</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Middle Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PortfolioDistribution data={distributionData} />
          <MarketTrends />
        </div>

        {/* Stock Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StockChart data={{ labels: [], prices: [] }} symbol="AAPL" />
          <TopMovers />
        </div>

        {/* Bottom Row - Stock List */}
        <StockList
          stocks={[]}
          onAdd={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onSelect={() => {}}
        />
      </motion.div>
    </main>
  );
}
