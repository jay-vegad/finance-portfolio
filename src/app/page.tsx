'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StockChart from '@/components/StockChart';
import StockList from '@/components/StockList';
import PortfolioSummary from '@/components/PortfolioSummary';
import PortfolioDistribution from '@/components/PortfolioDistribution';
import MarketTrends from '@/components/MarketTrends';
import TopMovers from '@/components/TopMovers';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  shares: number;
  sector: string;
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
const INITIAL_STOCKS = [
  { id: '1', symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 2.34, shares: 100, sector: 'Energy' },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy Services', price: 3567.80, change: -1.23, shares: 50, sector: 'IT' },
  { id: '3', symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: 0.45, shares: 150, sector: 'Banking' }
];

// Sample market trends data
const marketTrendsData = {
  sectors: ['IT', 'Banking', 'Healthcare', 'Energy', 'Consumer'],
  growth: [12.5, 8.3, 15.2, -3.1, 5.7]
};

// Sample top movers data
const topMoversData = {
  labels: ['9:15', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '15:30'],
  stocks: [
    {
      name: 'TCS',
      data: [3550.75, 3555.60, 3558.30, 3553.45, 3556.70, 3559.80, 3557.90, 3567.80]
    },
    {
      name: 'INFY',
      data: [1450.75, 1452.60, 1455.30, 1453.45, 1454.70, 1455.80, 1456.90, 1456.60]
    },
    {
      name: 'WIPRO',
      data: [450.75, 452.60, 453.30, 454.45, 455.70, 456.80, 456.90, 456.70]
    }
  ]
};

// Sample chart data generator
const generateChartData = (symbol: string) => {
  const today = new Date();
  const labels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  });

  // Generate random prices with a trend based on the stock's current change
  const basePrice = INITIAL_STOCKS.find(s => s.symbol === symbol)?.price || 100;
  const trend = INITIAL_STOCKS.find(s => s.symbol === symbol)?.change || 0;
  
  const prices = labels.map((_, i) => {
    const randomChange = (Math.random() - 0.5) * 20;
    const trendChange = (trend / 100) * basePrice * (i / labels.length);
    return basePrice + randomChange + trendChange;
  });

  return { labels, prices };
};

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [chartData, setChartData] = useState({ labels: [], prices: [] });

  const handleAdd = (newStock: Stock) => {
    setStocks([...stocks, newStock]);
  };

  const handleEdit = (updatedStock: Stock) => {
    setStocks(stocks.map(stock => 
      stock.id === updatedStock.id ? updatedStock : stock
    ));
  };

  const handleDelete = (id: string) => {
    setStocks(stocks.filter(stock => stock.id !== id));
    if (selectedStock?.id === id) {
      setSelectedStock(null);
    }
  };

  const handleSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setChartData(generateChartData(stock.symbol));
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
            <PortfolioSummary data={portfolioData} />
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
                  <span className="text-green-500">+₹45,678.25</span>
                </div>
                <div className="flex justify-between">
                  <span>Total P&L</span>
                  <span className="text-green-500">+₹5,47,892.50</span>
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
          <MarketTrends data={marketTrendsData} />
        </div>

        {/* Stock Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StockChart data={chartData} symbol={selectedStock?.symbol || ''} />
          <TopMovers data={topMoversData} />
        </div>

        {/* Bottom Row - Stock List */}
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
