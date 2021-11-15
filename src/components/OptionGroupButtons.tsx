import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

type Option = {
  onSelect: () => void;
  label: string;
  isSelected: boolean;
};

interface Props {
  options: Option[];
}

function OptionGroupButtons({ options }: Props) {
  return (
    <ButtonGroup color="secondary" className="h-8">
      {options.map(option => (
        <Button
          key={option.label}
          variant={option.isSelected ? 'contained' : 'outlined'}
          onClick={() => option.onSelect()}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default OptionGroupButtons;
