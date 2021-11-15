import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatRelative, parseISO } from 'date-fns';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { currencyToImage } from '@/helpers/currency';
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
    <div className="w-full p-4 border shadow lg:w-auto md:place-self-end lg:ml-8">
      <h3 className="text-sm font-semibold">
        {t('common.recent-transactions')}
      </h3>
      {loading && (
        <div className="flex items-center justify-center h-50vh">
          <CircularProgress />
        </div>
      )}
      {transactions && !loading && (
        <TableContainer>
          <Table>
            <TableBody>
              {transactions.slice(0, 5).map(row => (
                <TableRow key={row.id}>
                  <TableCell align="justify">
                    <p className="font-semibold">
                      {row.direction === 'sell' ? (
                        <span>{t('common.sold')}</span>
                      ) : (
                        <span>{t('common.bought')}</span>
                      )}
                    </p>
                    <p className="text-gray-default">
                      {formatRelative(parseISO(row.createdAt), new Date())}
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end flex-nowrap">
                      {row.direction === 'sell' ? (
                        <span className="truncate text-error-default">
                          {`- ${
                            row.baseAmount
                          } ${row.baseCurrency.toUpperCase()}`}
                        </span>
                      ) : (
                        <span className="truncate text-success-default">
                          {`+ ${
                            row.baseAmount
                          } ${row.baseCurrency.toUpperCase()}`}
                        </span>
                      )}
                      <img
                        src={currencyToImage(row.baseCurrency)}
                        alt={`${row.baseCurrency} Icon`}
                        className="inline w-3 ml-2"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!transactions && !loading && (
        <p className="my-4 text-sm text-gray-default">
          {t('transactions.no-transactions-yet')}
        </p>
      )}
      <Link to="/wallet/transactions" className="flex mt-4">
        <Button color="primary" endIcon={<ChevronRight />}>
          {t('common.full-transactions-history')}
        </Button>
      </Link>
    </div>
  );
}
