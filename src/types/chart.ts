export interface ChartContext {
  parsed: {
    y: number;
  };
  dataset: {
    label: string;
    data: number[];
  };
  raw: number;
  label: string;
}

export interface AxisContext {
  value: number;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  shares: number;
  sector: string;
} 