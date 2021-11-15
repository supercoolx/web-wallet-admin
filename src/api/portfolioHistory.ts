import axios from 'axios';
import { TimePeriod } from '@/interfaces';
import { PortfolioHistory } from '@/stores/portfolioStore';
import { API_URL } from '@/config';

const getPortfolioHistory = (timePeriod: TimePeriod) =>
  axios
    .get<PortfolioHistory[]>(`${API_URL}/crypto/portfolio/history`, {
      params: { timePeriod },
    })
    .then(res => res.data);

export default getPortfolioHistory;
