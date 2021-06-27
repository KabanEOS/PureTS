
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import React, { Suspense, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-use';

import ProjectListProvider from 'contexts/ProjectList/ProjectList';
import ScrumListProvider from 'contexts/ScrumList/ScrumList';
import Notifier from 'framework/snackbars/Notifier';
import { GlobalTheme } from 'models/graph/theme.model';

import ScrumProjectsPage from 'pages/ScrumProjectsPage/ScrumProjectsPage';
import ScrumTablePage from 'pages/ScrumTablePage/ScrumTablePage';
import { logoutHandler } from 'plugins/level-1/authentication-azuread/actions/login.actions';
import { logInWithAzureAd } from 'plugins/level-1/authentication-azuread/authProvider';
import { RootState } from 'redux/models/root.state';
import { getMuiThemeFromCurrentTheme } from 'shared/helpers/theme.helper';
import Loader from 'shared/layout/Loader/Loader';

import 'scss/_App.scss';

const NavBar = React.lazy(() => import('shared/layout/Navbar/containers/Navbar'));

const App = (): JSX.Element => {
  const currentTheme = useSelector((state: RootState) => state.user?.preferredSettings.theme);
  const currentUser = useSelector((state: RootState) => state.user);

  const theme = currentTheme || GlobalTheme.Regular;
  const muiTheme = getMuiThemeFromCurrentTheme(theme);
  const [cookies, setCookie] = useCookies();

  //TEMP WORKAROUND!!!
  const query = new URLSearchParams(useLocation().search);
  const userEmail = query.get('useremail');
  const themeParam = query.get('theme') as GlobalTheme;

  useEffect(() => {
    logInWithAzureAd(currentUser, cookies, setCookie, userEmail, 'en-US', themeParam);
  }, [currentUser]);

  const routes = (
    <BrowserRouter>
      <NavBar />
      <ProjectListProvider>
        <ScrumListProvider >
          <div className="main" >
            <Switch>
              <Route exact path="/" render={(): JSX.Element => <ScrumTablePage />} />
              <Route exact path="/projects" render={(): JSX.Element => <ScrumProjectsPage />} />
              <Route exact path="/logout" render={(): JSX.Element => { logoutHandler(); return (<div></div>); }} />
            </Switch>
          </div>
        </ScrumListProvider >
      </ProjectListProvider>
    </BrowserRouter>
  );

  return (
    <ThemeProvider theme={muiTheme} >
      <SnackbarProvider maxSnack={3}>
        <Notifier />
        <Suspense fallback={<Loader />}>
          {currentUser && <div className={` theme--${theme}`}>
            {routes}
          </div>}
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;