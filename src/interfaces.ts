export type Direction = 'buy' | 'sell';
export type Currency = 'btc' | 'eth' | 'usdc' | 'usd';
export type TradeAction =
  | 'buy'
  | 'sell'
  | 'send'
  | 'receive'
  | 'convert'
  | 'transfer';
export interface CurrencyBalance {
  total: number;
  currency: 'usd';
  gains: number;
  gainsPerc: number;
  coinAmount: number;
}

export interface Quote {
  sell: string;
  buy: string;
}
export interface NumericQuote {
  sell: number;
  buy: number;
}

export interface PreviewData {
  base: {
    currency: Currency;
    prevBalance: string;
    newBalance: string;
    amount: string;
    fees: string;
  };
  quote: {
    currency: Currency;
    prevBalance: string;
    newBalance: string;
    amount: string;
    fees: string;
  };
}

export interface ProvisionCreationResponse extends PreviewData {
  id: string;
  customerId: string;
  accountId: string;
  direction: Direction;
  expiresOn: string;
}

export interface SendCryptoPreviewResponse extends PreviewData {
  id: string;
  walletFrom: string;
  walletTo: string;
  expiresOn: string;
}
export type TimePeriod = 'year' | 'month' | 'week' | 'day' | 'hour';

export interface Transaction {
  baseAmount: number;
  baseCurrency: Currency;
  createdAt: string;
  direction: 'sell' | 'buy';
  id: string;
  price: number;
  quoteAmount: number;
  quoteCurrency: 'usd';
  status: 'cancelled';
}
