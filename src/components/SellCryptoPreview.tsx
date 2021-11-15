import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
} from '@material-ui/core';
import { Currency, PreviewData } from '@/interfaces';
import CurrencyCard from '@/components/CurrencyCard';
import { currencyToSymbol } from '@/helpers/currency';
import LoadingButton from '@/components/LoadingButton';

interface Props {
  currency: Currency;
  isLoading: boolean;
  data: PreviewData;
  onCancel: () => void;
  onSubmit: () => void;
}

function SellCryptoPreview({
  currency,
  isLoading,
  data,
  onCancel,
  onSubmit,
}: Props) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'base' | 'quote'>('base');
  const quoteCurrency = data.quote.currency;
  const baseCurrency = data.base.currency;

  const selectedPreviewData = useMemo(
    () => (selectedTab === 'base' ? data.base : data.quote),
    [data, selectedTab]
  );

  return (
    <div>
      <h1 className="mt-8 text-xl font-semibold text-center">
        {t('buy-crypto.sale-summary')}
      </h1>
      <hr className="my-8 border-0 border-b border-gray-300" />
      <h2 className="text-sm font-semibold">{t('common.market')}</h2>
      <CurrencyCard
        currency={currency}
        timeLabel={t('common.today')}
        className="mb-4"
      />

      <h2 className="text-sm font-semibold">{t('sell-crypto.summary')}:</h2>
      <Tabs
        value={selectedTab}
        onChange={(_, newVal) => setSelectedTab(newVal)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          value="base"
          label={t('buy-crypto.preview.view-in-currency', {
            currency: currencyToSymbol(baseCurrency),
          })}
        />
        <Tab
          value="quote"
          label={t('buy-crypto.preview.view-in-currency', {
            currency: currencyToSymbol(quoteCurrency),
          })}
        />
      </Tabs>
      <TableContainer>
        <Table aria-label="Preview Sell data">
          <TableBody>
            <TableRow key="prevBalance">
              <TableCell align="left">
                {t('sell-crypto.previous-balance')}
              </TableCell>
              <TableCell align="right">
                {selectedPreviewData.prevBalance}
              </TableCell>
            </TableRow>
            <TableRow key="fiatAmount">
              <TableCell align="left">
                {t('sell-crypto.sell-in-currency', {
                  currency: currencyToSymbol(baseCurrency),
                })}
              </TableCell>
              <TableCell align="right">{selectedPreviewData.amount}</TableCell>
            </TableRow>
            <TableRow key="fees">
              <TableCell align="left">
                {t('sell-crypto.fees-in-currency', {
                  currency: currencyToSymbol(baseCurrency),
                })}
              </TableCell>
              <TableCell align="right">{selectedPreviewData.fees}</TableCell>
            </TableRow>
            <TableRow key="newBalance">
              <TableCell align="left">
                <span className="font-semibold">
                  {t('sell-crypto.new-balance')}
                </span>
              </TableCell>
              <TableCell align="right">
                <span className="font-semibold">
                  {selectedPreviewData.newBalance}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between mt-8 mb-20">
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onSubmit}
          loading={isLoading}
        >
          <span>{t('sell-crypto.sale-confirm')}</span>
        </LoadingButton>
        <Button variant="outlined" onClick={onCancel}>
          {t('sell-crypto.cancel-sale')}
        </Button>
      </div>
    </div>
  );
}

export default SellCryptoPreview;
