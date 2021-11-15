import { makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getAccounts, { Account } from '@/api/accounts';
import ShimmerPlaceHolder from '@/components/ShimmerPlaceHolder';

interface Props {
  onChange: (val: Account) => void;
}

const useStyles = makeStyles(() => ({
  selectMenu: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

function AccountSelect({ onChange }: Props) {
  const classes = useStyles();
  const { data: accounts, isLoading } = useQuery('getAccounts', () =>
    getAccounts()
  );
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (accounts) {
      setSelected(accounts[0]?.id);

      if (typeof onChange === 'function') {
        onChange(accounts[0]);
      }
    }
  }, [accounts]);

  const handleChange = ev => {
    setSelected(ev.target.value);

    if (typeof onChange === 'function') {
      const selectedAccount = accounts!.find(acc => acc.id === ev.target.value);

      if (selectedAccount) {
        onChange(selectedAccount);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <ShimmerPlaceHolder />
      ) : (
        <Select
          variant="outlined"
          fullWidth
          classes={{ selectMenu: classes.selectMenu }}
          labelId="payment-select-label"
          id="payment-select-input"
          value={selected}
          onChange={handleChange}
        >
          {accounts!.map((acc: Account) => (
            <MenuItem key={acc.id} value={acc.id}>
              <div className="flex justify-between w-full">
                <div>{acc.type}</div>
                <div>{acc.name}</div>
              </div>
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
}

export default AccountSelect;
