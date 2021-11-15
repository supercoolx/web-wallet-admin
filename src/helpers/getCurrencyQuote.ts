import axios from 'axios';
import { Currency, Quote } from '@/interfaces';
import { API_URL } from '@/config';

export default async function getCurrentQuote(baseCurrency: Currency) {
  const quoteCurrency = 'usd';

  const { data } = await axios.get<Quote>(
    `${API_URL}/genubank/crypto/quote?baseCurrency=${baseCurrency}&quoteCurrency=${quoteCurrency}`
  );

  return data;
}
