import { Serie } from '@nivo/line';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { Button, CircularProgress } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useQuery } from 'react-query';
import { Equalizer } from '@material-ui/icons';
import MainLayout from '@/components/layout/MainLayout';
import OptionGroupButtons from '@/components/OptionGroupButtons';
import AccountCard from '@/components/AccountCard';
import LineChart from '@/components/LineChart';
import SubNav from '@/components/SubNav';
import RecentTransactions from '@/components/RecentTransactions';
import ShimmerPlaceHolder from '@/components/ShimmerPlaceHolder';
import { CurrencyBalance, TimePeriod } from '@/interfaces';
import { portfolioContext } from '@/stores/portfolioStore';
import useBasePath from '@/hooks/basePath';
import getPortfolioHistory from '@/api/portfolioHistory';
import { getColorForCurrency } from '@/helpers/currency';

export interface PortfolioHistory {
  date: string;
  value: number;
}

export interface Balance {
  total: number;
  currency: 'USD';
  gains: number;
  gainsPerc: number;
  currencies: Record<string, CurrencyBalance>;
}

const formatMap = {
  day: 'p',
  month: 'MM/dd',
  year: 'P',
};

function Dashboard() {
  const { t } = useTranslation();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('year');
  const history = useHistory();
  const currentRoute = useBasePath();
  const portfolio = useContext(portfolioContext);

  const { data, isLoading, refetch } = useQuery(
    ['portfolioHistory', timePeriod],
    () => getPortfolioHistory(timePeriod)
  );

  useEffect(() => {
    refetch();
  }, [timePeriod]);

  const graphData: Serie[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        id: `${timePeriod}PortfolioHistory`,
        data: data.map(item => ({
          x: format(parseISO(item.date), formatMap[timePeriod]),
          y: item.value,
        })),
      },
    ];
  }, [data]);

  const changePeriod = (period: TimePeriod) => {
    if (timePeriod === period) return;

    setTimePeriod(period);
  };

  const timePeriodOptions = [
    {
      label: t('common.day'),
      onSelect: () => changePeriod('day'),
      isSelected: timePeriod === 'day',
    },
    {
      label: t('common.month'),
      onSelect: () => changePeriod('month'),
      isSelected: timePeriod === 'month',
    },
    {
      label: t('common.year'),
      onSelect: () => changePeriod('year'),
      isSelected: timePeriod === 'year',
    },
  ];

  const openTradeModal = (path: string) => {
    history.push(`${currentRoute}/m/trade/${path}`);
  };

  return (
    <MainLayout>
      <div className="flex space-x-4">
        <SubNav />
        <div className="w-1/5 mt-7">
          <NavLink to="/wallet/dashboard/m/trade">
            <Button variant="contained" color="primary" className="w-full">
              <Equalizer />
              <span className="ml-2">{t('common.trade')}</span>
            </Button>
          </NavLink>
        </div>
      </div>

      <div className="flex flex-row flex-wrap space-x-4 lg:flex-row-reverse lg:flex-nowrap">
        <RecentTransactions />
        <div className="w-full">
          <header className="flex mt-8 lg:mt-0">
            <div className="flex flex-grow">
              {portfolio.balance && (
                <>
                  <div className="mr-4">
                    <h1>{t('common.total-balance')}</h1>
                    <span className="text-2xl">
                      {portfolio.totalFormattedBalance}
                    </span>
                  </div>
                  <div>
                    <small>
                      {`${portfolio.totalGainsPercFormatted}
                  ${portfolio.totalGainsFormatted}`}
                    </small>
                  </div>
                </>
              )}
            </div>

            <OptionGroupButtons options={timePeriodOptions} />
          </header>
          <div style={{ height: '300px' }} className="flex">
            {isLoading && <CircularProgress className="m-auto" />}
            {graphData && !isLoading && (
              <LineChart data={graphData} colors={getColorForCurrency('usd')} />
            )}
          </div>

          <h1 className="text-xl">{t('common.wallet')}</h1>
          {portfolio.balance?.currencies ? (
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              <AccountCard
                currency="usdc"
                currencyBalance={portfolio.usdcBalance}
                buyAction={() => openTradeModal('buy/usdc')}
                sellAction={() => openTradeModal('sell/usdc')}
                tradeAction={() => openTradeModal('select/usdc')}
              />
              <AccountCard
                currency="btc"
                currencyBalance={portfolio.btcBalance}
                buyAction={() => openTradeModal('buy/btc')}
                sellAction={() => openTradeModal('sell/btc')}
                tradeAction={() => openTradeModal('select/btc')}
              />
              <AccountCard
                currency="eth"
                currencyBalance={portfolio.ethBalance}
                buyAction={() => openTradeModal('buy/eth')}
                sellAction={() => openTradeModal('sell/eth')}
                tradeAction={() => openTradeModal('select/eth')}
              />
            </div>
          ) : (
            <ShimmerPlaceHolder />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default observer(Dashboard);
