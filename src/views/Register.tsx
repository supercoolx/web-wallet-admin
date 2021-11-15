import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, Redirect, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { userContext } from '@/stores/userStore';
import PasswordInput from '@/components/PasswordInput';

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required('common.errors.email-is-required')
      .email('common.errors.email-is-invalid'),
    password: yup.string().required('common.errors.password-is-required'),
  })
  .required();

interface FormInput {
  username: string;
  password: string;
}

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const user = useContext(userContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormInput> = async data => {
    setError('');
    setLoading(true);
    await user.signUp(data.username, data.password).catch(e => {
      setError(e.message);
    });
    setLoading(false);
  };

  const { state } = useLocation();

  if (user.signedIn) {
    return <Redirect to={(state as any)?.from || '/wallet/dashboard'} />;
  }

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-wrap max-w-screen-lg mx-auto mt-20">
          <div className="flex-1 m-8">
            <form
              className="flex flex-col space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-6xl text-bold">{t('register.heading')}</h1>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label={t('login.email.label')}
                    variant="outlined"
                    error={!!errors.username}
                    helperText={t(errors.username?.message || '')}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordInput
                    field={field}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              {error && <Alert severity="error">{error}</Alert>}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={22} className="p-1" />
                ) : (
                  t('register.register')
                )}
              </Button>
              <Link to="/signin">
                <Button variant="contained" className="w-full">
                  {t('register.already-have-an-account')}
                </Button>
              </Link>
            </form>
          </div>
          <div
            className="flex flex-1 m-8 mt-4 md:mt-32 lg:mt-8"
            style={{ minWidth: 200 }}
          >
            <img src="/assets/TheRegisterBg.svg" alt="Sign Up Background" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Register);
