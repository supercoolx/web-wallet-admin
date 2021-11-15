import { Button, CircularProgress, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useLocation, Redirect } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { userContext } from '@/stores/userStore';
import PasswordInput from '@/components/PasswordInput';

interface FormInput {
  username: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().required('common.errors.email-is-required'),
    password: yup.string().required('common.errors.password-is-required'),
  })
  .required();

function Login() {
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
    await user.signIn(data.username, data.password).catch(e => {
      setError(e.message);
    });
    setLoading(false);
  };

  const { state } = useLocation<any>();

  if (user.signedIn) {
    return <Redirect to={state?.from || '/reports'} />;
  }

  return (
    <div
      style={{
        background:
          'linear-gradient(176deg, rgba(255,255,255,1) 0, rgba(255,255,255,1) 450px, rgba(237,245,246,1) 450px',
      }}
      className="w-full min-h-screen"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap max-w-screen-lg mx-auto mt-20">
          <div
            className="flex flex-1 m-8 mt-4 md:mt-32 lg:mt-8"
            style={{ minWidth: 200 }}
          >
            <img src="/assets/WomanSittingOnBallBg.svg" alt="" />
          </div>
          <div className="flex-1 m-8">
            <form
              className="flex flex-col space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-6xl text-bold">{t('login.heading')}</h1>
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
                  t('login.login')
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Login);
