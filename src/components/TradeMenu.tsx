import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AccountBalanceOutlined,
  AddOutlined,
  RefreshOutlined,
  RemoveOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import useBasePath from '@/hooks/basePath';
import { CloseContext } from './SideModal';

interface NavItemProps {
  to: string;
  title: string;
  description: string;
  children: React.ReactChild | React.ReactChildren;
  className?: string;
}

function NavItem({
  to,
  title,
  description,
  children,
  className,
}: NavItemProps) {
  return (
    <NavLink to={to} className={`my-1 ${className}`}>
      <div className="flex p-4 transition-shadow rounded shadow hover:shadow-md">
        <div className="p-1 pr-4">{children}</div>
        <div>
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </NavLink>
  );
}

function TradeMenu({ currency = 'select' }) {
  const { t } = useTranslation();
  const fontSize = 40;
  const basePath = useBasePath();

  return (
    <CloseContext.Consumer>
      {onClose => (
        <div className="flex flex-col">
          <h1 className="mt-8 text-xl font-semibold text-center">
            {t('transfer.start-trading')}
          </h1>
          <hr className="w-full my-8 border-0 border-b border-gray-300" />
          {/* TODO: route to currency selector */}
          <NavItem
            to={`${basePath}/m/trade/buy/${currency}`}
            title={t('trade-menu.buy')}
            description={t('trade-menu.buy-description')}
          >
            <AddOutlined color="primary" style={{ fontSize }} />
          </NavItem>
          <NavItem
            to={`${basePath}/m/trade/sell/${currency}`}
            title={t('trade-menu.sell')}
            description={t('trade-menu.sell-description')}
          >
            <RemoveOutlined color="primary" style={{ fontSize }} />
          </NavItem>
          <NavItem
            to={`${basePath}/m/trade/send/${currency}`}
            title={t('trade-menu.send')}
            description={t('trade-menu.send-description')}
          >
            <TrendingUpOutlined color="primary" style={{ fontSize }} />
          </NavItem>
          <NavItem
            to={`${basePath}/m/trade/receive/${currency}`}
            title={t('trade-menu.receive')}
            description={t('trade-menu.receive-description')}
          >
            <TrendingDownOutlined color="primary" style={{ fontSize }} />
          </NavItem>
          <NavItem
            to={`${basePath}/m/trade/convert/${currency}`}
            title={t('trade-menu.convert')}
            description={t('trade-menu.convert-description')}
          >
            <RefreshOutlined color="primary" style={{ fontSize }} />
          </NavItem>
          <NavItem
            to={`${basePath}/m/trade/transfer/${currency}`}
            title={t('trade-menu.transfer')}
            description={t('trade-menu.transfer-description')}
          >
            <AccountBalanceOutlined color="primary" style={{ fontSize }} />
          </NavItem>
          <div className="my-8">
            <Button variant="outlined" onClick={onClose} fullWidth>
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      )}
    </CloseContext.Consumer>
  );
}

export default TradeMenu;
