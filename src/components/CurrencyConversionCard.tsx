import React from 'react';

import {
  currencyToImage,
  currencyToName,
  formatCurrency,
} from '@/helpers/currency';
import { Currency } from '@/interfaces';

interface Props {
  currency: Currency;
  description?: string;
  usdValue: number | string;
  cryptoValue: number | string;
}

const parse = (val: number | string): number => {
  if (typeof val === 'string') {
    return parseFloat(val);
  }

  return val;
};

function CurrencyConversionCard({
  currency,
  description,
  usdValue,
  cryptoValue,
}: Props) {
  return (
    <div className="flex mt-2 bg-gray-100 border rounded shadow">
      <img
        src={currencyToImage(currency)}
        alt={`${currencyToName(currency)} icon`}
        className="self-center w-12 h-12 p-2 ml-4"
      />
      <div className="flex-grow p-4">
        <h2 className="text-sm font-semibold">{currencyToName(currency)}</h2>
        <h3 className="text-xs">{description}</h3>
      </div>
      <div className="m-4 text-right">
        <div className="text-sm font-semibold">
          {formatCurrency(parse(usdValue || 0))}
        </div>
        <div className="text-xs">
          <span className="uppercase">{currency} </span>
          {cryptoValue || 0}
        </div>
      </div>
    </div>
  );
}

export default CurrencyConversionCard;
