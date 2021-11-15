import axios from 'axios';
import { TimePeriod } from '@/interfaces';
import { PortfolioHistory } from '@/stores/portfolioStore';
import { API_URL } from '@/config';

const getCurrencyHistory = (
  timePeriod: TimePeriod,
  currencies = 'usdc,btc,eth'
) =>
  axios
    .get<PortfolioHistory[]>(`${API_URL}/crypto/currencies/history`, {
      params: { timePeriod, currencies },
    })
    .then(res => res.data);

export default getCurrencyHistory;
