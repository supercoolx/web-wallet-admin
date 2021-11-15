import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState, ReactChildren, ReactChild } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordInput: React.FC<{
  errorMessage?: string;
  field: any;
  children?: ReactChildren | ReactChild;
}> = ({ field, errorMessage, children }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel error={!!errorMessage} htmlFor="outlined-adornment-password">
        {t('login.password.label')}
      </InputLabel>
      <OutlinedInput
        {...field}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        error={!!errorMessage}
        labelWidth={70}
      />
      {errorMessage && <FormHelperText error>{t(errorMessage)}</FormHelperText>}
      {children}
    </FormControl>
  );
};

export default PasswordInput;
