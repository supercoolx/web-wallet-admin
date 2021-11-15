import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import CurrencyHead from '@/components/CurrencyHead';
import { Currency } from '@/interfaces';
import { formatCurrency } from '@/helpers/currency';

interface Props {
  currency: Currency;
  cryptoValue: number;
  usdValue: number;
  className?: string;
}

function WalletBalanceCard({
  currency,
  className,
  usdValue,
  cryptoValue,
  ...cardProperties
}: Props) {
  return (
    <div
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...cardProperties}
      className={classNames(
        'flex overflow-hidden border border-transparent rounded shadow justify-between',
        className
      )}
    >
      <CurrencyHead currency={currency} />
      <div className="p-4 pr-4">
        <div>
          <h2 className="text-lg font-semibold text-right">
            {formatCurrency(usdValue)}
          </h2>
          <p className="text-right">{formatCurrency(cryptoValue, currency)}</p>
        </div>
      </div>
    </div>
  );
}

export default observer(WalletBalanceCard);
