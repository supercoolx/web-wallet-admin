import React from 'react';
import classNames from 'classnames';
import { TrendingDown, TrendingUp, TrendingFlat } from '@material-ui/icons';
import { formatCurrency } from '@/helpers/currency';

type Props = {
  marketValue: number;
  gainsPerc: number;
  timeLabel: string;
};

function CurrencyTrend({ marketValue, gainsPerc, timeLabel }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-right">
        {formatCurrency(marketValue)}
      </h2>
      <p className="text-right">
        <span
          className={classNames({
            'text-success-default': gainsPerc > 0,
            'text-error-default': gainsPerc < 0,
            'text-warning-default': gainsPerc === 0,
            'text-right': true,
          })}
        >
          {gainsPerc > 0 && <TrendingUp />}
          {gainsPerc < 0 && <TrendingDown />}
          {gainsPerc === 0 && <TrendingFlat />} {gainsPerc} %
        </span>
        <span className="ml-2 text-xs text-gray-default">{timeLabel}</span>
      </p>
    </div>
  );
}

export default CurrencyTrend;
