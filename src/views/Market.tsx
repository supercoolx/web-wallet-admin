import { Serie } from '@nivo/line';
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { Button, CircularProgress, Paper } from '@material-ui/core';
import { useQuery } from 'react-query';
import { Equalizer } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import OptionGroupButtons from '@/components/OptionGroupButtons';
import SubNav from '@/components/SubNav';
import LineChart from '@/components/LineChart';
import CurrencyCard from '@/components/CurrencyCard';
import { TimePeriod } from '@/interfaces';
import getCurrencyHistory from '@/api/currencyHistory';
import { getColorForCurrency } from '@/helpers/currency';

export interface PortfolioHistory {
  date: string;
  value: number;
}

type Currency = 'eth' | 'btc' | 'usdc';

const formatMap = {
  day: 'p', // 12:00 AM
  week: 'd eeeeee', // Monday, Tuesday, ..., Sunday
  hour: 'p', //
  year: 'P', // 04/29/1453
};

function InfoBox({ headline, children }) {
  return (
    <>
      <h1 className="mt-8 text-xl font-semibold">{headline}</h1>
      <Paper className="px-6 py-4 mt-4 mr-8 text-sm" elevation={4}>
        {children}
      </Paper>
    </>
  );
}

function Market() {
  const { t } = useTranslation();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('year');
  const [currency, setCurrency] = useState<Currency>('eth');

  const { data, isLoading, refetch } = useQuery(
    ['currencyHistory', timePeriod],
    () => getCurrencyHistory(timePeriod)
  );

  const graphData: Serie[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        id: `${timePeriod}${currency}CurrencyHistory`,
        data: data[currency].map((item: PortfolioHistory) => ({
          x: format(parseISO(item.date), formatMap[timePeriod]),
          y: item.value,
        })),
      },
    ];
  }, [data, currency]);

  const changePeriod = (period: TimePeriod) => {
    if (timePeriod === period) return;

    setTimePeriod(period);
  };

  useEffect(() => {
    refetch();
  }, [timePeriod]);

  const timePeriodOptions = [
    {
      label: t('common.hour'),
      onSelect: () => changePeriod('hour'),
      isSelected: timePeriod === 'hour',
    },
    {
      label: t('common.day'),
      onSelect: () => changePeriod('day'),
      isSelected: timePeriod === 'day',
    },
    {
      label: t('common.week'),
      onSelect: () => changePeriod('week'),
      isSelected: timePeriod === 'week',
    },
    {
      label: t('common.year'),
      onSelect: () => changePeriod('year'),
      isSelected: timePeriod === 'year',
    },
  ];

  return (
    <MainLayout>
      <div className="flex space-x-4">
        <SubNav />
        <div className="w-1/5 mt-7">
          <NavLink to="/wallet/market/m/trade">
            <Button variant="contained" color="primary" className="w-full">
              <Equalizer />
              <span className="ml-2">{t('common.trade')}</span>
            </Button>
          </NavLink>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="flex-grow-0 flex-shrink-0">
          <h1 className="my-2 text-xl font-semibold">
            {t('common.check-the-market')}
          </h1>
          <CurrencyCard
            active={currency === 'btc'}
            currency="btc"
            onClick={() => setCurrency('btc')}
            timeLabel={t('common.today')}
            className="mb-4 mr-8"
          />
          <CurrencyCard
            active={currency === 'eth'}
            currency="eth"
            onClick={() => setCurrency('eth')}
            timeLabel={t('common.today')}
            className="mb-4 mr-8"
          />
          <CurrencyCard
            active={currency === 'usdc'}
            currency="usdc"
            onClick={() => setCurrency('usdc')}
            timeLabel={t('common.today')}
            className="mb-4 mr-8"
          />
        </div>

        <div className="flex-grow overflow-hidden">
          <header className="flex">
            <div className="flex flex-grow">
              <h2 className="text-xl font-semibold">
                {t(`common.currencies.${currency}.name`)}
              </h2>
            </div>

            <OptionGroupButtons options={timePeriodOptions} />
          </header>

          <div
            style={{ height: '300px' }}
            className="flex-grow w-full text-center"
          >
            {isLoading && <CircularProgress className="my-20" />}
            {graphData && graphData.length > 0 && !isLoading && (
              <LineChart
                data={graphData}
                colors={getColorForCurrency(currency)}
              />
            )}
          </div>
          <div className="p-4">
            {currency === 'btc' && (
              <InfoBox headline={t('market.about-bitcoin')}>
                <p>{t('market.bitcoin-info')}</p>
              </InfoBox>
            )}
            {currency === 'eth' && (
              <InfoBox headline={t('market.about-ethereum')}>
                <p>{t('market.ethereum-info')}</p>
              </InfoBox>
            )}
            {currency === 'usdc' && (
              <InfoBox headline={t('market.about-stablecoin')}>
                <p>{t('market.stablecoin-info')}</p>
              </InfoBox>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Market;
