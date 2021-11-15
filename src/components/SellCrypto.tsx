import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Currency, ProvisionCreationResponse } from '@/interfaces';
import SellCryptoEnter from '@/components/SellCryptoEnter';
import SellCryptoPreview from '@/components/SellCryptoPreview';
import { CloseContext } from '@/components/SideModal';
import { initPurchase } from '@/helpers/purchase';
import { confirmPurchase } from '@/api/purchase';

const useStyles = makeStyles(theme => ({
  successIcon: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
    fontSize: 140,
  },
}));

type Step = 'Enter' | 'Preview' | 'Done';

function SellCrypto() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { currency } = useParams<{ currency: Currency }>();
  const [currentStep, setCurrentStep] = useState<Step>('Enter');
  const [currencies] = useState<{
    base: Currency;
    quote: Currency;
  }>({ base: currency, quote: 'usd' });
  const [previewData, setPreviewData] = useState<ProvisionCreationResponse>();
  const { isLoading: loadingInitSell, mutate: doInitSell } = useMutation(
    ({
      amount,
      paymentGatewayId,
    }: {
      amount: number;
      paymentGatewayId: string;
    }) =>
      initPurchase(currencies.base, currencies.quote, amount, paymentGatewayId),
    {
      onSuccess: data => {
        setPreviewData(data);
        setCurrentStep('Preview');
      },
    }
  );
  const { isLoading: loadingConfirmSell, mutate: doConfirmSell } = useMutation(
    () => confirmPurchase(previewData!.id),
    {
      onSuccess: () => setCurrentStep('Done'),
    }
  );
  const isLoading = useMemo(
    () => loadingInitSell || loadingConfirmSell,
    [loadingInitSell, loadingConfirmSell]
  );

  const preview = async (amount: number, paymentGatewayId: string) => {
    doInitSell({ amount, paymentGatewayId });
  };

  const handleCancelPurchase = async () => {
    setCurrentStep('Enter');
  };

  return (
    <CloseContext.Consumer>
      {onClose => {
        if (currentStep === 'Enter')
          return (
            <SellCryptoEnter
              currency={currencies.base}
              onCancel={onClose}
              onPreview={preview}
              isLoading={isLoading}
            />
          );

        if (currentStep === 'Preview')
          return (
            <SellCryptoPreview
              currency={currencies.base}
              onCancel={handleCancelPurchase}
              onSubmit={doConfirmSell}
              isLoading={isLoading}
              data={previewData!}
            />
          );

        return (
          <div className="flex flex-col items-center">
            <h1 className="mt-8 text-xl font-semibold text-center">
              {t('sell-crypto.successful')}
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
        );
      }}
    </CloseContext.Consumer>
  );
}

export default SellCrypto;
