import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './App.pcss';
import { QueryClient, QueryClientProvider } from 'react-query';

import MainNavigation from '@/components/MainNavigation';
import ShimmerPlaceHolder from '@/components/ShimmerPlaceHolder';
import AuthenticatedRoute from '@/components/AuthenticatedRoute';
import FooterNav from '@/components/FooterNav';
import Privacy from '@/views/Privacy';
import Terms from '@/views/Terms';
import SideModal from '@/components/SideModal';
import useCountly from './hooks/useCountly';
import theme from './theme';

const Dashboard = React.lazy(() => import('@/views/Dashboard'));
const Login = React.lazy(() => import('@/views/Login'));
const Settings = React.lazy(() => import('@/views/Settings'));

function App() {
  useCountly();
  const queryClient = new QueryClient();

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <MainNavigation />

            <main className="flex flex-grow">
              <Suspense fallback={<ShimmerPlaceHolder />}>
                <Switch>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/terms">
                    <Terms />
                  </Route>
                  <Route exact path="/privacy">
                    <Privacy />
                  </Route>
                  <AuthenticatedRoute path="/reports">
                    <Dashboard />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute path="/settings">
                    <Settings />
                  </AuthenticatedRoute>
                  <Redirect to="/reports" />
                </Switch>
                <Switch>
                  <AuthenticatedRoute path={['*/m/trade/:action/:currency']}>
                    <SideModal open />
                  </AuthenticatedRoute>
                  {/* more modals might be added here */}
                </Switch>
              </Suspense>
            </main>

            <FooterNav />
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
