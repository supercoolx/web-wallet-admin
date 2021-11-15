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
import Register from '@/views/Register';
import FooterNav from '@/components/FooterNav';
import Privacy from '@/views/Privacy';
import Terms from '@/views/Terms';
import SideModal from '@/components/SideModal';
import useCountly from './hooks/useCountly';
import theme from './theme';
import TradeSwitch from './components/TradeSwitch';

const Dashboard = React.lazy(() => import('@/views/Dashboard'));
const Transactions = React.lazy(() => import('@/views/Transactions'));
const Market = React.lazy(() => import('@/views/Market'));
const Login = React.lazy(() => import('@/views/Login'));

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
                  <Route exact path="/signup">
                    <Register />
                  </Route>
                  <Route exact path="/terms">
                    <Terms />
                  </Route>
                  <Route exact path="/privacy">
                    <Privacy />
                  </Route>
                  <AuthenticatedRoute path="/wallet/dashboard">
                    <Dashboard />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute path="/wallet/transactions">
                    <Transactions />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute path="/wallet/market">
                    <Market />
                  </AuthenticatedRoute>
                  <Redirect to="/wallet/dashboard" />
                </Switch>
                <Switch>
                  <AuthenticatedRoute
                    path={[
                      '*/m/trade/:action/:currency',
                      '*/m/trade/:action',
                      '*/m/trade',
                    ]}
                  >
                    <SideModal open>
                      <TradeSwitch />
                    </SideModal>
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
