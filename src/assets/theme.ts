import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ff5c8d',
      main: '#E73273',
      dark: '#d2225d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b962ff',
      main: '#8e24aa',
      dark: '#4c00ae',
      contrastText: '#fff',
    },
    background: {
      default: '#262626',
      paper: '#303030',
    },
  },
});

export default theme;
