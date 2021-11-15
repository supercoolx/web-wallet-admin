import * as React from 'react';
import { Currency } from '@/interfaces';
import { currencyToImage, currencyToName } from '@/helpers/currency';

export interface ICurrencyNameProps {
  currency: Currency;
}

export default function CurrencyName({ currency }: ICurrencyNameProps) {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={currencyToImage(currency)}
        alt={`${currency} Icon`}
        className="w-3"
      />
      <span>{currencyToName(currency)}</span>
    </div>
  );
}
