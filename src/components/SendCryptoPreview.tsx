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
import CurrencyConversionCard from '@/components/CurrencyConversionCard';
import { SendCryptoPreviewResponse } from '@/interfaces';
import { currencyToSymbol } from '@/helpers/currency';

type Props = Pick<SendCryptoPreviewResponse, 'walletTo' | 'base' | 'quote'>;

function SendCryptoPreview({ base, quote, walletTo }: Props) {
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
        {t('send-crypto.preview.headline')}
      </h1>
      <hr className="my-8 border-0 border-b border-gray-300" />
      <h2 className="text-sm font-semibold">
        {t('send-crypto.amount-to-be-sent')}
      </h2>

      <CurrencyConversionCard
        currency={base.currency}
        usdValue={quote.prevBalance}
        cryptoValue={base.prevBalance}
        description={t('send-crypto.to-be-sent')}
      />

      <h2 className="mt-8 text-sm font-semibold">
        {t('send-crypto.recipient')}:
      </h2>
      <div className="overflow-hidden truncate ">{walletTo}</div>

      <h2 className="mt-8 text-sm font-semibold">
        {t('send-crypto.summary')}:
      </h2>
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
          label={t('send-crypto.preview.view-in-currency', {
            currency: currencyToSymbol(baseCurrency),
          })}
        />
        <Tab
          value="quote"
          label={t('send-crypto.preview.view-in-currency', {
            currency: currencyToSymbol(quoteCurrency),
          })}
        />
      </Tabs>

      <TableContainer>
        <Table aria-label="Preview Send data">
          <TableBody>
            <TableRow key="prevBalance">
              <TableCell align="left">
                {t('trade-crypto.previous-balance')}
              </TableCell>
              <TableCell align="right">{renderTab?.prevBalance}</TableCell>
            </TableRow>
            <TableRow key="amount">
              <TableCell align="left">
                {t('send-crypto.sending', {
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

export default SendCryptoPreview;
