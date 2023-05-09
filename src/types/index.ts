export interface ZONE {
  id: string,
  label: string,
  name: string
}

export interface PAIR {
  lastPrice: number;
  name: string;
  tradeAmountDecimals: number;
  priceDecimals: number;
  maxVariationRatio: string;
  minCost: string;
  high24: string;
  low24: string;
  vol24: string;
  vol24Base: string;
  change24Percentage: number;
  lastWeekPrices: Array<number>;
  localeName: string;
  zones: Array<ZONE>;
  imageUrl: string;
  active: boolean
}