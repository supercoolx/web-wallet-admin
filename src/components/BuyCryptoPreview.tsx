import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
} from '@material-ui/core';
import { PreviewData } from '@/interfaces';
import CurrencyCard from '@/components/CurrencyCard';
import { currencyToSymbol } from '@/helpers/currency';

function BuyCryptoPreview({ base, quote }: PreviewData) {
  const { t } = useTranslation();
  const [currencyTab, setCurrencyTab] = useState<'base' | 'quote'>('base');
  const quoteCurrency = quote?.currency;
  const baseCurrency = base?.currency;

  const selectedCurrency = useMemo(
    () => (currencyTab === 'base' ? baseCurrency : quoteCurrency),
    [currencyTab, baseCurrency, quoteCurrency]
  );

  const renderTab = useMemo(
    () => (currencyTab === 'base' ? base : quote),
    [currencyTab, base, quote]
  );

  return (
    <div>
      <h1 className="mt-8 text-xl font-semibold text-center">
        {t('buy-crypto.preview.headline')}
      </h1>
      <hr className="my-8 border-0 border-b border-gray-300" />
      <h2 className="text-sm font-semibold">{t('common.market')}</h2>
      <CurrencyCard
        currency={baseCurrency !== 'usd' ? baseCurrency : quoteCurrency}
        timeLabel={t('common.today')}
        className="mb-4"
      />

      <h2 className="text-sm font-semibold">{t('sell-crypto.summary')}:</h2>
      <Tabs
        value={currencyTab}
        onChange={(_, tabIndex) => {
          setCurrencyTab(tabIndex);
        }}
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
                {t('trade-crypto.previous-balance')}
              </TableCell>
              <TableCell align="right">{renderTab?.prevBalance}</TableCell>
            </TableRow>
            <TableRow key="amount">
              <TableCell align="left">
                {t('trade-crypto.purchase-in-currency', {
                  currency: currencyToSymbol(selectedCurrency),
                })}
              </TableCell>
              <TableCell align="right"> {renderTab?.amount}</TableCell>
            </TableRow>
            <TableRow key="fees">
              <TableCell align="left">
                {t('trade-crypto.fees-in-currency', {
                  currency: currencyToSymbol(selectedCurrency),
                })}
              </TableCell>
              <TableCell align="right">{renderTab?.fees}</TableCell>
            </TableRow>
            <TableRow key="newBalance">
              <TableCell align="left">
                <span className="font-semibold">
                  {t('trade-crypto.new-balance')}
                </span>
              </TableCell>
              <TableCell align="right">
                <span className="font-semibold">{renderTab?.newBalance}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BuyCryptoPreview;
