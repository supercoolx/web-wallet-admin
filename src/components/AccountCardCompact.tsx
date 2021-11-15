import React from 'react';
import { useTranslation } from 'react-i18next';

import { AccountBalanceOutlined } from '@material-ui/icons';
import CurrencyHead from '@/components/CurrencyHead';
import CurrencyTrend from '@/components/CurrencyTrend';
import { Currency, CurrencyBalance } from '@/interfaces';
import { formatCurrency } from '@/helpers/currency';

export interface IAccountCardProps {
  currency: Currency;
  currencyBalance?: CurrencyBalance;
}

function AccountCard({ currency, currencyBalance }: IAccountCardProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full mb-4 rounded shadow hover:shadow-md">
      <div className="flex justify-between">
        <CurrencyHead currency={currency} />
        <div className="m-4 text-right">
          <span className="mt-4">
            <AccountBalanceOutlined className="text-gray-default" />
            &nbsp;
            {formatCurrency(currencyBalance?.total || 0)}
          </span>
          <CurrencyTrend
            gainsPerc={currencyBalance?.gainsPerc || 0}
            marketValue={currencyBalance?.gains || 0}
            timeLabel={t('common.today')}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
