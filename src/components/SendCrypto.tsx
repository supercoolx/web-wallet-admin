import React, { useEffect, useMemo, useState, useContext } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SwapVert, Check, Close, Done } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { CloseContext } from '@/components/SideModal';
import CurrencyInput from '@/components/CurrencyInput';
import {
  Currency,
  NumericQuote,
  SendCryptoPreviewResponse,
} from '@/interfaces';
import getCurrentQuote from '@/helpers/getCurrencyQuote';
import useWalletAddressInput from '@/hooks/walletAddressInput';
import SendCryptoPreview from '@/components/SendCryptoPreview';
import LoadingButton from '@/components/LoadingButton';
import CurrencyConversionCard from '@/components/CurrencyConversionCard';
import WalletBalanceCard from '@/components/WalletBalanceCard';
import { portfolioContext } from '@/stores/portfolioStore';

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

type Step = 'EnterAmount' | 'EnterRecipient' | 'Summary' | 'Success';

function SendCrypto() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { currency } = useParams<{ currency: Currency }>();
  const [inputValue, setInputValue] = useState(0);
  const [quote, setQuote] = useState<NumericQuote>({ buy: 0, sell: 0 });
  const [step, setStep] = useState<Step>('EnterAmount');
  const walletAddress = useWalletAddressInput('');
  const [preview, setPreview] = useState<SendCryptoPreviewResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const portfolio = useContext(portfolioContext);

  const [currencies, setCurrencies] = useState<{
    base: Currency;
    quote: Currency;
  }>({ base: currency, quote: 'usd' });

  useEffect(() => {
    const setNewQuote = async () => {
      const currentQuote = await getCurrentQuote(currency);
      setQuote({
        buy: parseFloat(currentQuote.buy),
        sell: parseFloat(currentQuote.sell),
      });
    };

    setNewQuote();
  }, [currency]);

  const swapCurrencies = () => {
    setCurrencies({
      base: currencies.quote,
      quote: currencies.base,
    });
  };

  const handleInputChange = (val: number) => {
    setInputValue(val);
  };

  const maxInputValue = useMemo(() => {
    if (currencies.base === 'usd') {
      return portfolio?.balance?.currencies[currency].total || 0;
    }
    return portfolio?.balance?.currencies[currency].coinAmount || 0;
  }, [portfolio, currencies.base]);

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

  const handleCancel = _step => async () => setStep(_step);

  const handleSendCrypto = () => {
    setIsLoading(true);
    // TODO: execute preview query instead
    window.setTimeout(() => {
      const result: SendCryptoPreviewResponse = {
        id: '33b6d57c-cb7c-40d8-9964-0030a1fbf460',
        expiresOn: '2021-08-28T09:42:00.198Z',
        walletFrom: '0x906b022be669e08da307ec29c664b2c50fd93625',
        walletTo: walletAddress.value,
        base: {
          currency: 'eth',
          prevBalance: '1.00',
          newBalance: '1.5232355223664',
          amount: '0.5232355223664',
          fees: '0.0000355223664',
        },
        quote: {
          currency: 'usd',
          prevBalance: '30000',
          newBalance: '21.680',
          amount: '8.320',
          fees: '10.45',
        },
      };
      setPreview(result);
      setIsLoading(false);
      setStep('Summary');
    }, 1000);
  };

  return (
    <CloseContext.Consumer>
      {onClose => (
        <div style={{ minHeight: '80vh' }} className="space-y-8">
          {step === 'EnterAmount' && (
            <>
              <h1 className="text-xl font-semibold text-center">
                {t('send-crypto.send-heading')}
              </h1>
              <hr className="border-0 border-b border-gray-300" />
              <div>
                <h3 className="text-sm font-semibold">{t('common.amount')}</h3>
                <div className="flex">
                  <div className="flex flex-col justify-around pr-4">
                    <Button
                      variant="outlined"
                      onClick={() => setInputValue(maxInputValue)}
                    >
                      Max
                    </Button>
                  </div>
                  <CurrencyInput
                    id="buy-dialog"
                    currency={currencies.base}
                    fontSize={32}
                    value={inputValue}
                    onChange={handleInputChange}
                    helperText={t('common.error.insufficient-funds')}
                    error={inputValue > maxInputValue}
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
              </div>
              <div>
                <h3 className="text-sm font-semibold">{t('common.wallet')}</h3>
                <WalletBalanceCard
                  currency={currency}
                  usdValue={portfolio?.balance?.currencies[currency].total || 0}
                  cryptoValue={
                    portfolio?.balance?.currencies[currency].coinAmount || 0
                  }
                />
              </div>
              <div className="flex justify-between w-full mb-20">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setStep('EnterRecipient')}
                  disabled={!inputValue || inputValue > maxInputValue}
                >
                  {t('send-crypto.enter-recipient')}
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  {t('send-crypto.cancel')}
                </Button>
              </div>
            </>
          )}
          {step === 'EnterRecipient' && (
            <>
              <h1 className="text-xl font-semibold text-center">
                {t('send-crypto.sent-currency-to-recipient')}
              </h1>
              <hr className="my-8 border-0 border-b border-gray-300" />
              <div>
                <h3 className="text-sm font-semibold">
                  {t('send-crypto.current-wallet')}
                </h3>
                <WalletBalanceCard
                  currency={currency}
                  usdValue={portfolio?.balance?.currencies[currency].total || 0}
                  cryptoValue={
                    portfolio?.balance?.currencies[currency].coinAmount || 0
                  }
                />
              </div>
              <CurrencyConversionCard
                currency={currency}
                usdValue={usdValue}
                cryptoValue={cryptoValue}
                description={t('send-crypto.to-be-sent')}
              />
              <TextField
                className="w-full"
                id="walletAddress"
                size="small"
                label={t('common.to')}
                value={walletAddress.value}
                onChange={ev => walletAddress.onChange(ev, currency)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {walletAddress.isValid === undefined && null}
                      {walletAddress.isValid === false && (
                        <Close color="error" />
                      )}
                      {walletAddress.isValid === true && (
                        <Check className="text-green-500" />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="w-full"
                id="remarks"
                size="small"
                multiline
                rows={5}
                label={t('send-crypto.remarks')}
                variant="outlined"
              />
              <div className="flex justify-between w-full mt-8 mb-20">
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={handleSendCrypto}
                  loading={isLoading}
                  disabled={!walletAddress.value || !walletAddress.isValid}
                >
                  {t('send-crypto.summary')}
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={handleCancel('EnterAmount')}
                >
                  {t('send-crypto.cancel')}
                </Button>
              </div>
            </>
          )}
          {step === 'Summary' && (
            <>
              <SendCryptoPreview
                base={preview!.base}
                quote={preview!.quote}
                walletTo={preview!.walletTo}
              />
              <div>
                <h3 className="text-sm font-semibold">
                  {t('trade-crypto.new-balance')}
                </h3>
                <WalletBalanceCard
                  currency={currency}
                  usdValue={Number(preview!.base.newBalance)}
                  cryptoValue={Number(preview!.quote.newBalance)}
                />
              </div>
              <div className="flex justify-between pb-20 mt-8">
                <LoadingButton
                  variant="contained"
                  color="primary"
                  loading={isLoading}
                  onClick={() => setStep('Success')}
                >
                  <span>{t('send-crypto.send-amount')}</span>
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={handleCancel('EnterRecipient')}
                >
                  {t('send-crypto.cancel-sending')}
                </Button>
              </div>
            </>
          )}
          {step === 'Success' && (
            <div className="flex flex-col items-center">
              <h1 className="mt-8 text-xl font-semibold text-center">
                {t('send-crypto.successful')}
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
        </div>
      )}
    </CloseContext.Consumer>
  );
}

export default observer(SendCrypto);
