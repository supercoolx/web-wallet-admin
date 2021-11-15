import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AccountCardCompact from '@/components/AccountCardCompact';
import { portfolioContext } from '@/stores/portfolioStore';
import { CloseContext } from './SideModal';

function SelectCrypto() {
  const { t } = useTranslation();
  const portfolio = useContext(portfolioContext);

  useEffect(() => {
    if (!portfolio.balance) {
      portfolio.fetchBalance();
    }
  }, [portfolio.balance]);

  return (
    <CloseContext.Consumer>
      {onClose => (
        <div>
          <>
            <h1 className="mt-8 text-xl font-semibold text-center">
              {t('common.select-currency')}
            </h1>
            <hr className="my-8 border-0 border-b border-gray-300" />
            <NavLink to="btc">
              <AccountCardCompact
                currency="btc"
                currencyBalance={portfolio.balance?.currencies.btc}
              />
            </NavLink>
            <NavLink to="eth">
              <AccountCardCompact
                currency="eth"
                currencyBalance={portfolio.ethBalance}
              />
            </NavLink>
            <NavLink to="usdc">
              <AccountCardCompact
                currency="usdc"
                currencyBalance={portfolio.usdcBalance}
              />
            </NavLink>

            <div className="my-8">
              <Button variant="outlined" onClick={onClose} fullWidth>
                {t('common.cancel')}
              </Button>
            </div>
          </>
        </div>
      )}
    </CloseContext.Consumer>
  );
}

export default observer(SelectCrypto);
