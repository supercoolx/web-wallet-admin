import { Button, CircularProgress } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Add, Remove, BarChart } from '@material-ui/icons';
import { useQuery } from 'react-query';
import { Serie } from '@nivo/line';
import CurrencyHead from '@/components/CurrencyHead';
import CurrencyTrend from '@/components/CurrencyTrend';
import { Currency, CurrencyBalance, TimePeriod } from '@/interfaces';
import { formatCurrency, getColorForCurrency } from '@/helpers/currency';
import MiniLineChart from '@/components/MiniLineChart';
import getCurrencyHistory from '@/api/currencyHistory';
import { PortfolioHistory } from '@/stores/portfolioStore';

export interface IAccountCardProps {
  currency: Currency;
  currencyBalance?: CurrencyBalance;
  buyAction: (currency: Currency) => void;
  sellAction: (currency: Currency) => void;
  tradeAction?: (currency: Currency) => void;
}

function AccountCard({
  currency,
  currencyBalance,
  buyAction,
  sellAction,
  tradeAction = () => undefined,
}: IAccountCardProps) {
  const { t } = useTranslation();

  const timePeriod: TimePeriod = 'day';
  const { data, isLoading } = useQuery(['currencyHistory', timePeriod], () =>
    getCurrencyHistory(timePeriod)
  );

  const graphData: Serie[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        id: `${timePeriod}${currency}CurrencyHistory`,
        data: data[currency].map((item: PortfolioHistory) => ({
          x: item.date,
          y: item.value,
        })),
      },
    ];
  }, [data, currency]);

  return (
    <div className="p-4 rounded shadow transition-reveal">
      <div className="flex justify-between mb-2">
        <CurrencyHead currency={currency} />
        <span>{formatCurrency(currencyBalance?.total || 0)}</span>
      </div>

      <div className="flex justify-between">
        <div className="flex h-12 w-44">
          {isLoading ? (
            <CircularProgress className="m-auto" />
          ) : (
            <MiniLineChart
              data={graphData}
              colors={getColorForCurrency(currency)}
            />
          )}
        </div>
        <CurrencyTrend
          gainsPerc={currencyBalance?.gainsPerc || 0}
          marketValue={currencyBalance?.gains || 0}
          timeLabel={t('common.today')}
        />
      </div>

      <div className="mt-4 space-x-1 reveal">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => buyAction(currency)}
        >
          {t('common.buy')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Remove />}
          onClick={() => sellAction(currency)}
        >
          {t('common.sell')}
        </Button>
        <Button
          variant="contained"
          startIcon={<BarChart />}
          onClick={() => tradeAction(currency)}
        >
          {t('common.trade')}
        </Button>
      </div>
    </div>
  );
}

export default AccountCard;
