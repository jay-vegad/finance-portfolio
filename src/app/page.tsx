'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StockChart from '@/components/StockChart';
import StockList from '@/components/StockList';
import PortfolioSummary from '@/components/PortfolioSummary';
import PortfolioDistribution from '@/components/PortfolioDistribution';
import MarketTrends from '@/components/MarketTrends';
import TopMovers from '@/components/TopMovers';
import { formatCurrency, formatPercentage } from '@/utils/format';
import { Stock } from '@/types';

interface ChartData {
  labels: string[];
  prices: number[];
}

// Sample portfolio data
const portfolioData = {
  totalValue: 2547892.50,
  dayChange: 45678.25,
  dayChangePercent: 1.82,
  totalReturn: 547892.50,
  totalReturnPercent: 27.4,
  activeStocks: 15
};

// Sample distribution data
const distributionData = {
  labels: ['IT & Technology', 'Banking & Finance', 'Healthcare', 'Consumer Goods', 'Energy'],
  values: [856432.50, 645789.25, 425678.50, 320456.75, 299535.50]
};

// Sample stocks data
const INITIAL_STOCKS: Stock[] = [
  {
    id: '1',
    symbol: 'HDFC',
    name: 'HDFC Bank Ltd',
    price: 1550.75,
    change: 2.5,
    shares: 100,
    sector: 'Banking',
    type: 'Large Cap'
  },
  { 
    id: '2', 
    symbol: 'TCS', 
    name: 'Tata Consultancy Services', 
    price: 3567.80, 
    change: -1.23, 
    shares: 50, 
    sector: 'IT',
    type: 'Large Cap'
  },
  { 
    id: '3', 
    symbol: 'RELIANCE', 
    name: 'Reliance Industries', 
    price: 2456.75, 
    change: 2.34, 
    shares: 100, 
    sector: 'Energy',
    type: 'Large Cap'
  }
];

// Sample market trends data
const marketTrendsData = {
  sectors: ['IT', 'Banking', 'Healthcare', 'Energy', 'Consumer'],
  growth: [12.5, 8.3, 15.2, -3.1, 5.7]
};

// Sample top movers data
const topMoversData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  stocks: [
    {
      name: 'HDFC Bank',
      data: [2.5, 3.1, -1.2, 4.5, 2.8]
    },
    {
      name: 'Reliance',
      data: [1.8, -2.2, 3.4, 1.9, 3.2]
    },
    {
      name: 'TCS',
      data: [-1.2, 2.8, 1.5, -0.8, 2.1]
    }
  ]
};

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [chartData, setChartData] = useState<ChartData>({ labels: [], prices: [] });

  const handleAdd = (stock: Stock) => {
    setStocks([...stocks, { ...stock, type: stock.type || 'Large Cap' }]);
  };

  const handleEdit = (stock: Stock) => {
    setStocks(stocks.map(s => s.id === stock.id ? stock : s));
  };

  const handleDelete = (id: string) => {
    setStocks(stocks.filter(s => s.id !== id));
    if (selectedStock?.id === id) {
      setSelectedStock(null);
    }
  };

  const handleSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setChartData(generateChartData(stock.symbol));
  };

  // Calculate portfolio summary data
  const portfolioSummary = {
    totalValue: stocks.reduce((total, stock) => total + (stock.price * stock.shares), 0),
    dayChange: stocks.reduce((total, stock) => total + (stock.price * stock.shares * stock.change / 100), 0),
    dayChangePercent: stocks.length ? (stocks.reduce((total, stock) => total + stock.change, 0) / stocks.length) : 0,
    totalReturn: 547892.50,
    totalReturnPercent: 27.4,
    activeStocks: stocks.length
  };

  const distributionData = {
    labels: ['IT', 'Banking', 'Energy', 'Healthcare', 'Consumer'],
    values: stocks.reduce((acc, stock) => {
      const sectorIndex = acc.findIndex(s => s.sector === stock.sector);
      if (sectorIndex >= 0) {
        acc[sectorIndex].value += stock.price * stock.shares;
      }
      return acc;
    }, [] as { sector: string; value: number }[]).map(s => s.value)
  };

  const marketTrendsData = {
    sectors: ['IT', 'Banking', 'Energy', 'Healthcare', 'Consumer'],
    growth: [12.5, 8.3, 15.2, -3.1, 5.7]
  };

  const generateChartData = (symbol: string): ChartData => {
    const labels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString();
    });

    const prices = Array.from({ length: 30 }, () => 
      Math.random() * 1000 + 500
    );

    return { labels, prices };
  };

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
            <PortfolioSummary {...portfolioSummary} />
          </div>
          <div>
            <motion.div
              className="bg-gray-800 rounded-xl p-6 shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Day&apos;s Gain</span>
                  <span className="text-green-500">+₹{formatCurrency(portfolioSummary.dayChange)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total P&L</span>
                  <span className="text-green-500">+₹{formatCurrency(portfolioSummary.totalReturn)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Stocks</span>
                  <span>{portfolioSummary.activeStocks}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Middle Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PortfolioDistribution 
            labels={distributionData.labels}
            values={distributionData.values}
          />
          <MarketTrends 
            sectors={marketTrendsData.sectors}
            growth={marketTrendsData.growth}
          />
        </div>

        {/* Stock Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {selectedStock && (
            <StockChart 
              data={chartData}
              symbol={selectedStock.symbol}
            />
          )}
          <TopMovers 
            labels={topMoversData.labels}
            stocks={topMoversData.stocks}
          />
        </div>

        <StockList
          stocks={stocks}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelect}
          selectedStock={selectedStock}
        />
      </motion.div>
    </main>
  );
}
