import axios from 'axios';
import { API_URL } from '@/config';
import { Currency, ProvisionCreationResponse, Transaction } from '@/interfaces';

/**
 * @param baseCurrency - the currency used for exactly calculating the quote
 * @param quoteCurrency - the currency I want to buy or sell
 * @param baseAmount - amount in base currency
 * @returns
 */
export const initPurchase = async (
  baseCurrency: Currency,
  quoteCurrency: Currency,
  baseAmount: number,
  paymentGateway: string
) => {
  // "buy" means selling the quote currency, "sell" means buying the quote currency
  const direction = baseCurrency === 'usd' ? 'sell' : 'buy';

  const { data } = await axios.post<ProvisionCreationResponse>(
    `${API_URL}/genubank/crypto/exchange-provisions`,
    {
      baseCurrency,
      quoteCurrency,
      baseAmount: `${baseAmount}`,
      direction,
      paymentGateway,
    }
  );

  return data;
};

export const confirmPurchase = async (exchangeId: string) => {
  const { data } = await axios.post<ProvisionCreationResponse>(
    `${API_URL}/genubank/crypto/complete-exchange-provision`,
    {
      exchangeId,
    }
  );

  return data;
};

export const getTransactions = async () => {
  const { data } = await axios.get<Transaction[]>(
    `${API_URL}/genubank/crypto/exchange-provisions`
  );

  return data;
};
