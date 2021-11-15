import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

interface Props extends ButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

function LoadingButton({ children, loading, ...buttonProperties }: Props) {
  return (
    <div className="relative">
      <Button
        disabled={loading}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...buttonProperties}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          className="absolute"
          style={{ left: '50%', top: '50%', marginLeft: -12, marginTop: -12 }}
        />
      )}
    </div>
  );
}

export default LoadingButton;
