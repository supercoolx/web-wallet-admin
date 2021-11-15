import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { Add, Equalizer, Remove } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import SubNav from '@/components/SubNav';
import MainLayout from '@/components/layout/MainLayout';
import CurrencyName from '@/components/CurrencyName';
import { formatCurrency } from '@/helpers/currency';
import { getTransactions } from '@/api/purchase';

export default function Transactions() {
  const { t } = useTranslation();

  const {
    data: transactions,
    isLoading: loading,
    refetch,
  } = useQuery(['transactions'], () => getTransactions());

  useEffect(() => {
    refetch();
  }, []);

  return (
    <MainLayout>
      <div className="flex space-x-4">
        <SubNav />
        <div className="w-1/5 mt-7">
          <NavLink to="/wallet/transactions/m/trade">
            <Button variant="contained" color="primary" className="w-full">
              <Equalizer />
              <span className="ml-2">{t('common.trade')}</span>
            </Button>
          </NavLink>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-50vh">
          <CircularProgress />
        </div>
      )}
      {transactions && !loading && (
        <TableContainer>
          <Table>
            <TableHead className="bg-secondary-default">
              <TableRow>
                <TableCell width="40" />
                <TableCell align="left">{t('common.currency')}</TableCell>
                <TableCell align="right">{t('common.amount')}</TableCell>
                <TableCell align="right">
                  {t('common.crypto-currency')}
                </TableCell>
                <TableCell align="right">{t('common.date')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="justify">
                    {row.direction === 'sell' ? (
                      <Remove color="error" />
                    ) : (
                      <Add style={{ color: green[500] }} />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <CurrencyName currency={row.baseCurrency} />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.quoteAmount, row.quoteCurrency)}
                  </TableCell>
                  <TableCell align="right">
                    {row.baseAmount} {row.baseCurrency}
                  </TableCell>
                  <TableCell align="right">
                    {format(parseISO(row.createdAt), 'PP')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </MainLayout>
  );
}
