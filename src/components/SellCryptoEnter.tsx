import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwapVert } from '@material-ui/icons';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import { Currency } from '@/interfaces';
import CurrencyInput from '@/components/CurrencyInput';
import CurrencyCard from '@/components/CurrencyCard';
import CurrencyConversionCard from '@/components/CurrencyConversionCard';
import LoadingButton from '@/components/LoadingButton';
import CurrencyHead from '@/components/CurrencyHead';
import { portfolioContext } from '@/stores/portfolioStore';
import { formatCurrency } from '@/helpers/currency';
import getQuote from '@/api/quote';

interface Props {
  currency: Currency;
  isLoading: boolean;
  onCancel: () => void;
  onPreview: (amount: number, paymentGateway: any) => void;
}

const useStyles = makeStyles(theme => ({
  primaryIconBtn: {
    background: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:focus': {
      outline: 'none',
    },
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  selectMenu: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const PAYMENT_GATEWAY_ID = '9dc29dbb-3216-4e65-ba5c-dbfc10b96991'; // tbd: which one to use here?

const quoteCurrency = 'usd';

function SellCryptoEnter({ currency, isLoading, onCancel, onPreview }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(0);
  const [currencies, setCurrencies] = useState<{
    base: Currency;
    quote: Currency;
  }>({ base: currency, quote: quoteCurrency });
  const portfolio = useContext(portfolioContext);

  const { data: quote, isLoading: loadingQuote } = useQuery(
    ['getQuote', currency, quoteCurrency],
    () => getQuote(currency, quoteCurrency)
  );

  const quoteValue = useMemo<number>(() => {
    if (!quote?.buy) {
      return 0;
    }

    if (currencies.base === 'usd') {
      return inputValue / quote.buy;
    }

    return inputValue;
  }, [currencies.base, inputValue, quote]);

  const baseValue = useMemo<number>(() => {
    if (!quote?.buy) {
      return 0;
    }

    if (currencies.base === 'usd') {
      return inputValue;
    }

    return inputValue * quote.buy;
  }, [currencies.base, inputValue, quote]);

  const swapCurrency = () => {
    setCurrencies({
      base: currencies.quote,
      quote: currencies.base,
    });
  };

  return (
    <div>
      <h1 className="mt-8 text-xl font-semibold text-center">
        {t('buy-crypto.enter-amount')}
      </h1>
      <hr className="my-8 border-0 border-b border-gray-300" />
      <h3 className="mb-2 text-sm font-semibold">{t('common.market')}</h3>
      <CurrencyCard
        currency={currency}
        timeLabel={t('common.today')}
        className="mb-4"
      />
      <h3 className="mb-2 text-sm font-semibold">
        {t('common.current-wallet')}
      </h3>
      <div className="flex rounded shadow">
        <CurrencyHead currency={currency} />
        <div className="flex flex-col p-4">
          <span className="text-lg font-semibold">
            {formatCurrency(
              portfolio.balance?.currencies[currency].total as number,
              portfolio.balance?.currencies[currency].currency
            )}
          </span>
          <span className="text-sm font-semibold text-right">
            <span className="uppercase">{currency} </span>
            {portfolio.balance?.currencies[currency].coinAmount}
          </span>
        </div>
      </div>
      <h3 className="mt-8 mb-2 text-sm font-semibold">{t('common.amount')}</h3>
      <div>
        <div className="flex">
          <CurrencyInput
            id="buy-dialog"
            currency={currencies.base}
            fontSize={32}
            onChange={val => setInputValue(val)}
          />
          <div className="flex flex-col justify-around pl-4">
            <IconButton
              aria-label="swap"
              classes={{ root: classes.primaryIconBtn }}
              onClick={swapCurrency}
            >
              <SwapVert />
            </IconButton>
          </div>
        </div>
        <CurrencyConversionCard
          currency={currency}
          usdValue={baseValue}
          cryptoValue={quoteValue}
          description={t('sell-crypto.to-be-sold')}
        />
      </div>

      <div className="flex justify-between mt-8 mb-20">
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading || loadingQuote}
          onClick={() => onPreview(inputValue, PAYMENT_GATEWAY_ID)}
          disabled={!inputValue}
        >
          <span>{t('sell-crypto.sale-preview')}</span>
        </LoadingButton>
        <Button variant="outlined" onClick={onCancel}>
          {t('sell-crypto.cancel-sale')}
        </Button>
      </div>
    </div>
  );
}

export default SellCryptoEnter;
