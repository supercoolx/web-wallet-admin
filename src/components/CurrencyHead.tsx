import React from 'react';
import { Currency } from '@/interfaces';
import { currencyMap } from '@/helpers/currency';

interface Props {
  currency: Currency;
}

function CurrencyHead({ currency }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={currencyMap[currency].icon}
        alt={`${currencyMap[currency].name} icon`}
        className="self-center p-2 w-14 h-14"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{currencyMap[currency].name}</h2>
        <h3 className="font-light uppercase">{currency}</h3>
      </div>
    </div>
  );
}

export default CurrencyHead;
