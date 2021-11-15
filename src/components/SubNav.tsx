import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const SubNavItem: React.FC<{ to: string }> = ({ to, children }) => (
  <NavLink
    to={to}
    className="h-10 p-2 text-sm font-semibold"
    activeClassName="border-primary border-b-2"
  >
    {children}
  </NavLink>
);
export default function SubNav() {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-grow h-10 mt-2 border-b border-gray-300">
      <SubNavItem to="/wallet/dashboard">{t('common.dashboard')}</SubNavItem>
      <SubNavItem to="/wallet/transactions">
        {t('common.transactions')}
      </SubNavItem>
      <SubNavItem to="/wallet/market">{t('common.market')}</SubNavItem>
    </nav>
  );
}
