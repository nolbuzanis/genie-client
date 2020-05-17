import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';
import { ToastProvider } from 'react-toast-notifications';
import { TrackPixelPageView } from './analytics';

//views and components
import Login from './views/LogIn';
import authContext from './Context/authContext';
import Signup from './views/SignUp';
//import Landing from './views/Landing';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import Artist from './views/Artist';
import Releases from './views/Releases';
import Introduction from './views/Introduction';
import ResetPassword from './views/ResetPassword';
import NewRelease from './views/NewRelease';
import GetStarted from './views/GetStarted';
import ArtistURIExplained from './views/ArtistURIExplained';
import ExtendedMenu from './views/ExtendedMenu';
import Home from './views/Home';
import ScrollToTop from './components/ScrollToTop';
import Profile from './views/Profile';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';
import Pricing from './views/Pricing';
import SubMenu from './components/SubMenu';
import PlanAndBilling from './views/PlanAndBilling';
import UpdatePayment from './views/UpdatePayment';
import Help from './views/Help';
import LandingTwo from './views/Landing/index2';
// import Followers from './views/Followers';

const settingsMenuItems = [
  { title: 'Plans & Billing', route: '/billing' }
  //{ title: "Change Password", route: '/settings' }
];
const legalMenuItems = [
  { title: 'Terms of Service', route: '/terms-of-service' },
  { title: 'Privacy Policy', route: '/privacy-policy' }
];

const App = () => {
  const [auth, setAuth] = React.useState({
    user: undefined,
    follower: undefined
  });
  const history = useHistory();

  history.listen(location => {
    TrackPixelPageView();
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });

  return (
    <authContext.Provider value={{ ...auth, setAuth }}>
      <ToastProvider autoDismiss autoDismissTimeout={5000}>
        <ScrollToTop />
        <Switch>
          <Route path='/' exact render={() => <LandingTwo />} />
          {/* <Route path='/landing' exact render={() => <LandingTwo />} /> */}
          <Route path='/artist/:id' exact render={() => <Artist />} />
          <Route
            path='/privacy-policy'
            exact
            render={() => <PrivacyPolicy />}
          />
          <Route
            path='/terms-of-service'
            exact
            render={() => <TermsOfService />}
          />
          <AuthRoute path='/login' exact component={Login} />
          <AuthRoute path='/signup' exact component={Signup} />
          <AuthRoute path='/get-started' exact component={GetStarted} />
          <Route
            path='/forgot-password'
            exact
            render={() => <ResetPassword />}
          />
          <PrivateRoute path='/home' exact component={Home} />
          <PrivateRoute path='/releases' exact component={Releases} />
          <PrivateRoute path='/releases/new' exact component={NewRelease} />
          <PrivateRoute path='/profile' exact component={Profile} />
          <PrivateRoute path='/introduction' exact component={Introduction} />
          <PrivateRoute
            path='/find-artist-uri'
            exact
            component={ArtistURIExplained}
          />
          <PrivateRoute path='/menu' exact component={ExtendedMenu} />
          <PrivateRoute path='/pricing' exact component={Pricing} />
          <PrivateRoute
            path='/settings'
            exact
            render={() => (
              <SubMenu title='Settings' menuItems={settingsMenuItems} />
            )}
          />
          <PrivateRoute path='/billing' exact component={PlanAndBilling} />
          <PrivateRoute
            path='/legal'
            exact
            render={() => (
              <SubMenu title={'Legal & Privacy'} menuItems={legalMenuItems} />
            )}
          />
          <PrivateRoute
            path='/update-payment'
            exact
            component={UpdatePayment}
          />
          <PrivateRoute path='/help' exact component={Help} />
          {/* <PrivateRoute path='/follower' exact component={Followers} /> */}
          <Route render={() => <Redirect to='/home' />} />
        </Switch>
      </ToastProvider>
    </authContext.Provider>
  );
};

export default App;
