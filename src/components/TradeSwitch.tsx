import React from 'react';
import { useParams } from 'react-router-dom';
import { Currency, TradeAction } from '@/interfaces';
import TradeMenu from '@/components/TradeMenu';
import SelectCrypto from '@/components/SelectCrypto';
import BuyCrypto from '@/components/BuyCrypto';
import SellCrypto from '@/components/SellCrypto';
import ReceiveCrypto from '@/components/ReceiveCrypto';
import SendCrypto from '@/components/SendCrypto';

interface RouteParams {
  action: TradeAction | 'select';
  currency: Currency | 'select';
}

function TradeSwitch() {
  const { currency, action } = useParams<RouteParams>();

  if (!action || action === 'select') {
    return <TradeMenu currency={currency} />;
  }

  if (!currency || currency === 'select') {
    return <SelectCrypto />;
  }

  if (action === 'buy') {
    return <BuyCrypto />;
  }

  if (action === 'sell') {
    return <SellCrypto />;
  }

  if (action === 'receive') {
    return <ReceiveCrypto />;
  }

  if (action === 'send') {
    return <SendCrypto />;
  }

  return (
    <div className="m-8 text-lg text-center">
      <p className="font-bold">
        {action} {currency}
      </p>
      will be available soon.
    </div>
  );
}

export default TradeSwitch;
