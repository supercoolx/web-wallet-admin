import React, { useState } from 'react';
import { Currency } from '@/interfaces';

export default (initialValue = '') => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  // TODO: replace simple address validation by proper module or endpoint
  const validate = (address: string, currency: Currency) => {
    if (currency === 'eth') {
      return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
    }
    if (currency === 'usdc') {
      return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
    }
    if (currency === 'btc') {
      return address.length > 24 && address.length < 36 && address[0] === '1';
    }

    return false;
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    currency: Currency
  ) {
    setValue(e.target.value);

    setIsValid(validate(e.target.value, currency));
  }

  return {
    value,
    isValid,
    onChange: handleChange,
  };
};
