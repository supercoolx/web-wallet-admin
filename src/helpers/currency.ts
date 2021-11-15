import { Currency } from '@/interfaces';

export const currencyMap = {
  eth: {
    name: 'Ethereum',
    icon: '/assets/IconEthereum.svg',
    symbol: 'Ξ',
    color: 'rgb(79,84,124)',
    formatOptions: {
      maximumFractionDigits: 6,
    },
  },
  btc: {
    name: 'Bitcoin',
    icon: '/assets/IconBitcoin.svg',
    symbol: '₿',
    color: 'rgb(242,129,22)',
    formatOptions: {
      maximumFractionDigits: 8,
    },
  },
  usd: {
    name: 'US Dollar',
    icon: '/assets/IconDollarSwap.svg', // TODO: doesnt exist yet
    symbol: '$',
    color: 'rgb(0,122,255)',
  },
  usdc: {
    name: 'Stablecoin',
    icon: '/assets/IconDollarSwap.svg',
    symbol: 'USDC',
    color: 'rgb(31,94,190)',
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  if (['USD', 'EUR'].includes(currency.toUpperCase())) {
    return new Intl.NumberFormat('US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  }

  return new Intl.NumberFormat('US', {
    ...currencyMap[currency].formatOptions,
  }).format(amount);
};

export const currencyToName = (currency: Currency) =>
  currencyMap[currency].name;

export const currencyToImage = (currency: Currency) =>
  currencyMap[currency].icon;

export const currencyToSymbol = (currency: Currency) =>
  currencyMap[currency].symbol;

export const getColorForCurrency = (currency: Currency) =>
  currencyMap[currency].color;
