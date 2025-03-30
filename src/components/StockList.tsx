'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/format';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, TableCellsIcon } from '@heroicons/react/24/outline';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  shares: number;
  sector: string;
  type: string;
}

interface StockListProps {
  stocks: Stock[];
  onAdd: (stock: Stock) => void;
  onEdit: (stock: Stock) => void;
  onDelete: (symbol: string) => void;
  onSelect: (symbol: string) => void;
  selectedStock: string;
}

const SECTORS = [
  'Technology',
  'Finance',
  'Healthcare',
  'Energy',
  'Consumer Goods',
  'Industrial',
  'Materials',
  'Real Estate',
  'Telecommunications',
  'Utilities',
];

const STOCK_TYPES = ['Common Stock', 'Preferred Stock', 'ETF', 'Mutual Fund'];

// Add Indian stocks data
const INDIAN_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.' },
  { symbol: 'INFY', name: 'Infosys Ltd.' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.' },
  { symbol: 'ITC', name: 'ITC Ltd.' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd.' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd.' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd.' },
  { symbol: 'TITAN', name: 'Titan Company Ltd.' },
];

export default function StockList({ stocks, onAdd, onEdit, onDelete, onSelect, selectedStock }: StockListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [newStock, setNewStock] = useState<Partial<Stock>>({
    symbol: '',
    name: '',
    price: 0,
    change: 0,
    shares: 0,
    sector: SECTORS[0],
    type: STOCK_TYPES[0],
  });

  const handleAdd = () => {
    setIsAdding(true);
    setNewStock({
      symbol: '',
      name: '',
      price: 0,
      change: 0,
      shares: 0,
      sector: SECTORS[0],
      type: STOCK_TYPES[0],
    });
  };

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock);
    setNewStock(stock);
  };

  const handleDelete = (symbol: string) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      onDelete(symbol);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStock) {
      onEdit(newStock as Stock);
      setEditingStock(null);
    } else {
      onAdd(newStock as Stock);
      setIsAdding(false);
    }
    setNewStock({
      symbol: '',
      name: '',
      price: 0,
      change: 0,
      shares: 0,
      sector: SECTORS[0],
      type: STOCK_TYPES[0],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 w-full overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <TableCellsIcon className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Holdings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your stock investments</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Stock</span>
        </motion.button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Symbol</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Sector</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Change</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Shares</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Value</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stocks.map((stock) => (
              <motion.tr
                key={stock.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onSelect(stock.symbol)}
                className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedStock === stock.symbol ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{stock.symbol}</td>
                <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{stock.name}</td>
                <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{stock.sector}</td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">{formatCurrency(stock.price)}</td>
                <td className={`py-3 px-4 text-sm text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">{stock.shares}</td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">
                  {formatCurrency(stock.price * stock.shares)}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  <div className="flex justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(stock);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(stock.symbol);
                      }}
                      className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {(isAdding || editingStock) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isAdding ? 'Add New Stock' : 'Edit Stock'}
                </h3>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingStock(null);
                    setNewStock({
                      symbol: '',
                      name: '',
                      price: 0,
                      change: 0,
                      shares: 0,
                      sector: '',
                      type: '',
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Symbol
                  </label>
                  <select
                    value={newStock.symbol}
                    onChange={(e) => {
                      const selectedStock = INDIAN_STOCKS.find(stock => stock.symbol === e.target.value);
                      setNewStock({
                        ...newStock,
                        symbol: e.target.value,
                        name: selectedStock?.name || '',
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a stock</option>
                    {INDIAN_STOCKS.map((stock) => (
                      <option key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newStock.name}
                    onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sector
                  </label>
                  <select
                    value={newStock.sector}
                    onChange={(e) => setNewStock({ ...newStock, sector: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a sector</option>
                    {SECTORS.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={newStock.type}
                    onChange={(e) => setNewStock({ ...newStock, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a type</option>
                    {STOCK_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Change (%)
                  </label>
                  <input
                    type="number"
                    value={newStock.change}
                    onChange={(e) => setNewStock({ ...newStock, change: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Shares
                  </label>
                  <input
                    type="number"
                    value={newStock.shares}
                    onChange={(e) => setNewStock({ ...newStock, shares: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                    min="1"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingStock(null);
                      setNewStock({
                        symbol: '',
                        name: '',
                        price: 0,
                        change: 0,
                        shares: 0,
                        sector: '',
                        type: '',
                      });
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    {isAdding ? 'Add Stock' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}