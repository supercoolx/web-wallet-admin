import axios from 'axios';
import { API_URL } from '@/config';
import { Currency, NumericQuote, Quote } from '@/interfaces';

const getQuote = (
  baseCurrency: Currency,
  quoteCurrency: Currency
): Promise<NumericQuote> =>
  axios
    .get<Quote>(`${API_URL}/genubank/crypto/quote`, {
      params: {
        baseCurrency,
        quoteCurrency,
      },
    })
    .then(res => ({
      buy: parseFloat(res.data.buy),
      sell: parseFloat(res.data.sell),
    }));

export default getQuote;
