import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

import colors from '../colors.json';

const theme = createMuiTheme({
  typography: { fontSize: 12 },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary.default,
    },
    error: {
      main: colors.error.default,
      light: colors.error.light,
    },
    success: {
      main: colors.success.default,
      light: colors.success.light,
    },
    info: {
      main: colors.info.default,
      light: colors.info.light,
    },
    warning: {
      main: colors.warning.default,
      light: colors.warning.light,
    },
  },
});

export default responsiveFontSizes(theme);
