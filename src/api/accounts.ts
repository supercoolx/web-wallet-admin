import axios from 'axios';
import { API_URL } from '@/config';
import { Currency } from '@/interfaces';

export interface Account {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  accountNumber: string;
  type: string;
  currencyCode: Currency;
  balance: number;
}

const getAccounts = async () => {
  const { data } = await axios.get<Account[]>(`${API_URL}/banking/accounts`);

  return data;
};

export default getAccounts;
