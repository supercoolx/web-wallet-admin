import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import request from '@/helpers/request';
import { API_URL } from '@/config';
import { CurrencyBalance } from '@/interfaces';
import { formatCurrency } from '@/helpers/currency';

// const HISTORY_URL = `${API_URL}/crypto/portfolio/history`;
const BALANCE_URL = `${API_URL}/crypto/portfolio`;

export interface PortfolioHistory {
  date: string;
  value: number;
}

export interface Balance {
  total: number;
  currency: 'USD';
  gains: number;
  gainsPerc: number;
  currencies: Record<string, CurrencyBalance>;
}

class PortfolioStore {
  balance: Balance | undefined = undefined;

  get totalFormattedBalance() {
    if (!this.balance) {
      return '';
    }
    return formatCurrency(this.balance.total, this.balance.currency);
  }

  get totalGainsFormatted() {
    if (!this.balance) {
      return '';
    }
    return `${this.balance.gains > 0 ? '+' : '-'}${formatCurrency(
      this.balance.gains,
      this.balance.currency
    )}`;
  }

  get totalGainsPercFormatted() {
    if (!this.balance) {
      return '';
    }
    return `${this.balance.gains > 0 ? '+' : '-'}${this.balance.gainsPerc}%`;
  }

  get ethBalance() {
    return this.balance?.currencies.eth;
  }

  get btcBalance() {
    return this.balance?.currencies.btc;
  }

  get usdcBalance() {
    return this.balance?.currencies.usdc;
  }

  constructor() {
    makeAutoObservable(this);
    this.fetchBalance();
  }

  async fetchBalance() {
    const { data } = await request<Balance>('get', BALANCE_URL, undefined);

    this.balance = data;
  }
}

const portfolioStore = new PortfolioStore();
const portfolioContext = createContext<PortfolioStore>(portfolioStore);

export { portfolioStore, portfolioContext };
