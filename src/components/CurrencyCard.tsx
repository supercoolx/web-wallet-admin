import React, { useContext } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import CurrencyHead from '@/components/CurrencyHead';
import CurrencyTrend from '@/components/CurrencyTrend';
import { Currency } from '@/interfaces';
import { currenciesContext } from '@/stores/currenciesStore';

interface Props {
  currency: Currency;
  timeLabel?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

function CurrencyCard({
  currency,
  timeLabel = '',
  active,
  onClick,
  className,
  ...cardProperties
}: Props) {
  const currencies = useContext(currenciesContext);

  return (
    <div
      /* eslint-disable react/jsx-props-no-spreading */
      {...(!!onClick && { onClick })}
      {...(!!onClick && { role: 'button' })}
      {...cardProperties}
      /* eslint-enable react/jsx-props-no-spreading */
      className={classNames(
        'flex overflow-hidden border border-transparent rounded shadow',
        {
          'border-gray-600': active,
          'cursor-pointer hover:border-gray-600 transition-colors duration-300':
            onClick,
          [`${className}`]: !!className,
        }
      )}
    >
      <CurrencyHead currency={currency} />
      <div className="p-4">
        {currencies && currencies[currency] ? (
          <CurrencyTrend
            gainsPerc={currencies[currency]?.todaysCoursePerc}
            marketValue={currencies[currency]?.marketValue}
            timeLabel={timeLabel}
          />
        ) : (
          <>
            <div className="w-16 h-4 background-shimmer" />
            <div className="w-8 h-3 mt-5 background-shimmer" />
          </>
        )}
      </div>
    </div>
  );
}

export default observer(CurrencyCard);
