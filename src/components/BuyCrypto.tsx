import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwapVert, Done } from '@material-ui/icons';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Currency, ProvisionCreationResponse } from '@/interfaces';
import AccountSelect from '@/components/AccountSelect';
import CurrencyInput from '@/components/CurrencyInput';
import CurrencyCard from '@/components/CurrencyCard';
import CurrencyConversionCard from '@/components/CurrencyConversionCard';
import LoadingButton from '@/components/LoadingButton';
import BuyCryptoPreview from '@/components/BuyCryptoPreview';
import { initPurchase, confirmPurchase } from '@/api/purchase';
import getQuote from '@/api/quote';
import { Account } from '@/api/accounts';
import { CloseContext } from './SideModal';

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
  successIcon: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
    fontSize: 140,
  },
  selectMenu: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const quoteCurrency = 'usd';

function BuyCrypto() {
  const { currency } = useParams<{ currency: Currency }>();
  const { t } = useTranslation();
  const classes = useStyles();
  const [currencies, setCurrencies] = useState<{
    base: Currency;
    quote: Currency;
  }>({ base: currency, quote: quoteCurrency });
  const [inputValue, setInputValue] = useState(0);
  const [paymentGateway, setPaymentGateway] = useState<Account>();
  const [state, setState] = useState(0);
  const [purchasePreview, setPurchasePreview] =
    useState<ProvisionCreationResponse | undefined>();
  const { data: quote, isLoading: loadingQuote } = useQuery(
    ['getQuote', currency, quoteCurrency],
    () => getQuote(currency, quoteCurrency)
  );
  const { isLoading: loadingInitPurchase, mutate: doInitPurchase } =
    useMutation(
      () =>
        initPurchase(
          currencies.base,
          currencies.quote,
          inputValue,
          paymentGateway!.id
        ),
      {
        onSuccess: data => {
          setPurchasePreview(data);
          setState(1);
        },
      }
    );
  const { isLoading: loadingConfirmPurchase, mutate: doConfirmPurchase } =
    useMutation(() => confirmPurchase(purchasePreview!.id), {
      onSuccess: () => setState(2),
    });
  const isLoading = useMemo(
    () => loadingQuote || loadingInitPurchase || loadingConfirmPurchase,
    [loadingQuote, loadingInitPurchase, loadingConfirmPurchase]
  );

  const swapCurrencies = () => {
    setCurrencies({
      base: currencies.quote,
      quote: currencies.base,
    });
  };

  const handleInputChange = (val: number) => {
    setInputValue(val);
  };

  const cryptoValue = useMemo<number>(() => {
    if (!quote?.buy) {
      return 0;
    }

    if (currencies.base === 'usd') {
      return inputValue / quote.buy;
    }

    return inputValue;
  }, [currencies.base, inputValue, quote]);

  const usdValue = useMemo<number>(() => {
    if (!quote?.buy) {
      return 0;
    }

    if (currencies.base === 'usd') {
      return inputValue;
    }

    return inputValue * quote.buy;
  }, [currencies.base, inputValue, quote]);

  const handleCancelPurchase = async () => {
    setState(0);
  };

  return (
    <CloseContext.Consumer>
      {onClose => (
        <div>
          {state === 2 && (
            <div className="flex flex-col items-center">
              <h1 className="mt-8 text-xl font-semibold text-center">
                {t('buy-crypto.successful')}
              </h1>
              <hr className="w-full my-8 border-0 border-b border-gray-300" />

              <Done
                classes={{ root: classes.successIcon }}
                className="p-4 m-4 rounded-full"
              />
              <div className="mt-4 mb-16">
                <Button variant="outlined" onClick={onClose}>
                  {t('common.close')}
                </Button>
              </div>
            </div>
          )}

          {state === 1 && (
            <>
              <BuyCryptoPreview
                base={purchasePreview!.base}
                quote={purchasePreview!.quote}
              />
              <div className="my-16 text-gray-500">
                {paymentGateway!.type} {paymentGateway!.name}
              </div>
              <div className="flex justify-between mt-8 mb-20">
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={() => doConfirmPurchase()}
                  loading={isLoading}
                >
                  <span>{t('trade-crypto.confirm-buy')}</span>
                </LoadingButton>
                <Button variant="outlined" onClick={handleCancelPurchase}>
                  <span>{t('trade-crypto.cancel-buy')}</span>
                </Button>
              </div>
            </>
          )}

          {state === 0 && (
            <>
              <h1 className="mt-8 text-xl font-semibold text-center">
                {t('buy-crypto.enter-amount')}
              </h1>
              <hr className="my-8 border-0 border-b border-gray-300" />
              <h3 className="mb-2 text-sm font-semibold">
                {t('common.market')}
              </h3>
              <CurrencyCard
                currency={currency}
                timeLabel={t('common.today')}
                className="mb-4"
              />
              <h3 className="mt-8 mb-2 text-sm font-semibold">
                {t('common.amount')}
              </h3>
              <div className="flex">
                <CurrencyInput
                  id="buy-dialog"
                  currency={currencies.base}
                  fontSize={32}
                  onChange={handleInputChange}
                />
                <div className="flex flex-col justify-around pl-4">
                  <IconButton
                    aria-label="swap"
                    classes={{ root: classes.primaryIconBtn }}
                    onClick={swapCurrencies}
                  >
                    <SwapVert />
                  </IconButton>
                </div>
              </div>
              <CurrencyConversionCard
                currency={currency}
                usdValue={usdValue}
                cryptoValue={cryptoValue}
                description={t('buy-crypto.to-be-purchased')}
              />
              <div className="mt-8">
                <h3 className="text-sm font-semibold" id="payment-select-label">
                  {t('common.payment-provider')}
                </h3>
                <AccountSelect
                  onChange={(val: Account) => setPaymentGateway(val)}
                />
              </div>
              <div className="flex justify-between mt-8 mb-20">
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={() => doInitPurchase()}
                  loading={isLoading}
                  disabled={!inputValue}
                >
                  <span>{t('buy-crypto.purchase-preview')}</span>
                </LoadingButton>
                <Button variant="outlined" onClick={onClose}>
                  {t('buy-crypto.cancel-purchase')}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </CloseContext.Consumer>
  );
}

export default BuyCrypto;
