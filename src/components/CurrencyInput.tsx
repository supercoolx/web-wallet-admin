import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import {
  OutlinedInput,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';

import { Currency } from '@/interfaces';

interface Props {
  className?: string;
  currency?: Currency;
  disabled?: boolean;
  error?: boolean;
  fontSize?: number;
  helperText?: string;
  id: string;
  label?: string;
  onChange?(value: number): void;
  value?: number;
}

const currencyPreset = {
  usd: {
    symbol: '$',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 2,
  },
  usdc: {
    symbol: 'USDC',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 2,
  },
  btc: {
    symbol: '₿',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  },
  eth: {
    symbol: 'Ξ',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 6,
  },
};

function MuiCurrencyInput(props: Props) {
  const {
    className,
    currency = 'usdc',
    disabled,
    error,
    fontSize,
    helperText,
    id,
    label,
    onChange,
    value: initialValue = 0,
  } = props;

  const [value, setValue] = useState<string | number>(initialValue);

  /**
   * @param param0
   * - formattedValue: '$23,234,235.56', - value after applying formatting
   * - value: '23234235.56', - non formatted value as numeric string 23234235.56, if you are setting this value to state make sure to pass isNumericString prop to true
   * - floatValue: 23234235.56 - floating point representation. For big numbers it can have exponential syntax
   */
  const handleChange = ({ formattedValue, floatValue }) => {
    setValue(formattedValue);
    if (typeof onChange === 'function') {
      onChange(floatValue);
    }
  };

  useEffect(() => setValue(initialValue), [initialValue]);

  const { decimalSeparator, thousandSeparator, precision } =
    currencyPreset[currency];
  const postfix = currency.toUpperCase();

  const handleFocus = () => {
    if (value === 0 || value === `0 ${postfix}`) {
      setValue('');
    }
  };
  const handleBlur = () => {
    if (value === ` ${postfix}`) {
      setValue(0);
    }
  };

  return (
    <div className={className}>
      <FormControl error={error} fullWidth variant="outlined">
        <InputLabel htmlFor={id} error={error} style={{ fontSize }}>
          {label}
        </InputLabel>
        <NumberFormat
          placeholder="0"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onValueChange={handleChange}
          customInput={OutlinedInput}
          decimalSeparator={decimalSeparator}
          thousandSeparator={thousandSeparator}
          allowEmptyFormatting
          allowNegative={false}
          suffix={` ${postfix}`}
          className="text-xl font-bold text-right"
          style={{ fontSize }}
          value={value}
          decimalScale={precision}
          inputProps={{
            style: { fontSize },
            id: `${id}-input`,
            disabled,
            className: 'text-right font-bold text-xl',
          }}
        />
        {error ? (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        ) : null}
      </FormControl>
    </div>
  );
}

export default MuiCurrencyInput;
