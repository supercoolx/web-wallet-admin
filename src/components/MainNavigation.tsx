import React, { useContext, useState } from 'react';
import {
  Link,
  NavLink,
  withRouter,
  RouteChildrenProps,
} from 'react-router-dom';
import {
  AppBar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon } from '@material-ui/icons';
import { userContext } from '@/stores/userStore';

import EqusLogoDark from '@/assets/EqusLogoDark.svg';

interface NavigationItem {
  label: string;
  path: string;
}

const NavItems: React.FC<{ items: NavigationItem[] }> = ({ items }) => (
  <>
    {items.map(({ path, label }) => (
      <NavLink
        key={path}
        to={path}
        className="flex px-4 py-2 mb-2 border-b flex-0 border-gray-light link-white"
        activeClassName="border-accent active"
      >
        <div className="flex-shrink-0 truncate">{label}</div>
      </NavLink>
    ))}
  </>
);

function MainNavigation({ history }: RouteChildrenProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useContext(userContext);

  const handleLogout = async () => {
    setLoading(true);
    await user.invalidateAuth();
    setLoading(false);
    history.push('/login');
  };

  const loggedOutNavigation = [
    {
      label: t('navigation.login'),
      path: '/login',
    },
    {
      label: t('navigation.signup'),
      path: '/signup',
    },
  ];

  const signedInNavigation = [
    {
      label: t('navigation.identity'),
      path: '/identity',
    },
    {
      label: t('navigation.wallet'),
      path: '/wallet',
    },
    {
      label: t('navigation.marketplace'),
      path: '/marketplace',
    },
    {
      label: t('navigation.deposit'),
      path: '/deposit',
    },
    {
      label: t('navigation.settings'),
      path: '/settings',
    },
  ];

  return (
    <AppBar position="static" color="secondary">
      <Toolbar className="container mx-auto">
        <div className="flex md:hidden">
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            edge="start"
            color="inherit"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
        </div>
        {user.signedIn ? (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {signedInNavigation.map(item => (
              <MenuItem onClick={handleClose} key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </MenuItem>
            ))}
            <MenuItem onClick={() => handleLogout()}>
              <div className="relative">{t('navigation.logout')}</div>
              {loading && (
                <CircularProgress
                  size={24}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: -12,
                    marginTop: -12,
                  }}
                />
              )}
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {loggedOutNavigation.map(item => (
              <MenuItem onClick={handleClose} key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </MenuItem>
            ))}
          </Menu>
        )}
        <Link to="/">
          <img
            src={EqusLogoDark}
            alt="blockchains"
            className="my-4"
            style={{ height: '42px' }}
          />
        </Link>
        <nav className="hidden w-full mx-4 md:flex">
          {user.signedIn ? (
            <div className="flex w-full">
              <NavItems items={signedInNavigation} />
              <div className="flex-grow mb-2 border-b border-gray-light" />
              <button
                type="button"
                onClick={() => handleLogout()}
                disabled={loading}
                className="flex px-4 py-2 mb-2 text-white text-opacity-50 transition-colors duration-500 ease-in-out border-b flex-0 border-gray-light focus:outline-none hover:text-white"
              >
                {loading && (
                  <CircularProgress size={22} className="absolute p-1 -ml-8" />
                )}
                {t('navigation.logout')}
              </button>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="flex-grow mb-2 border-b border-gray-light" />
              <NavItems items={loggedOutNavigation} />
            </div>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(MainNavigation);
