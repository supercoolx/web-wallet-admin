import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import request from '@/helpers/request';
import { API_URL } from '@/config';
import { Currency } from '@/interfaces';

const CURRENCIES_URL = `${API_URL}/crypto/currencies`;

interface MarketTrend {
  name: string;
  id: string;
  logo: string;
  currency: Currency;
  marketValue: number;
  todaysCoursePerc: number;
}

class CurrenciesStore {
  constructor() {
    makeAutoObservable(this);
    this.fetchCurrencies();
  }

  trends: MarketTrend[] = [];

  get eth() {
    return this.trends.find(items => items.id === 'eth');
  }

  get btc() {
    return this.trends.find(items => items.id === 'btc');
  }

  get usdc() {
    return this.trends.find(items => items.id === 'usdc');
  }

  async fetchCurrencies() {
    const { data } = await request<MarketTrend[]>(
      'get',
      CURRENCIES_URL,
      undefined
    );

    this.trends = data;
  }
}

const currenciesStore = new CurrenciesStore();
const currenciesContext = createContext<CurrenciesStore>(currenciesStore);

export { currenciesStore, currenciesContext };
