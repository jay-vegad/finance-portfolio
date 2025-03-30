import { Chart } from 'chart.js';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  shares: number;
  sector: string;
  type: string;
}

export interface ChartData {
  labels: string[];
  prices: number[];
}

export interface ChartContext {
  chart: Chart;
  tooltip: any; // You can make this more specific if needed
  dataIndex: number;
}

export interface ChartTooltipContext {
  parsed: {
    y: number;
  };
  raw: number;
}

export interface ChartAxisContext {
  value: number;
} 