import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';
import { ToastProvider } from 'react-toast-notifications';
import { TrackPixelPageView, reportMongoDBEvent } from './analytics';
import { getGeo } from './api';
//views and components
import Login from './views/LogIn';
import authContext from './Context/authContext';
import Signup from './views/SignUp';
//import Landing from './views/Landing';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
//import Artist from './views/Artist';
import Releases from './views/Releases';
//import Introduction from './views/Introduction';
import ResetPassword from './views/ResetPassword';
//import NewRelease from './views/NewRelease';
import GetStarted from './views/GetStarted';
import ArtistURIExplained from './views/ArtistURIExplained';
import DeezerExplained from './views/DeezerExplained';
import ExtendedMenu from './views/ExtendedMenu';
import Home from './views/Home';
import ScrollToTop from './components/ScrollToTop';
//import Profile from './views/Profile';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';
import Pricing from './views/Pricing';
import SubMenu from './components/SubMenu';
import PlanAndBilling from './views/PlanAndBilling';
import UpdatePayment from './views/UpdatePayment';
import Help from './views/Help';
import LandingTwo from './views/Landing/index2';
import Guides from './views/Guides';
import Article from './views/Article';
import LinkAccounts from './views/LinkAccounts';
import Link from './views/Link';
import EditLink from './views/EditLink';
import CreatePresave from './views/CreatePresave';
import EditPresave from './views/EditPresave';
import CreateRelease from './views/NewRelease';
// import Followers from './views/Followers';

const settingsMenuItems = [
  { title: 'Integrations', route: '/accounts' },
  { title: 'Plans & Billing', route: '/billing' },
  //{ title: "Change Password", route: '/settings' }
];
const legalMenuItems = [
  { title: 'Terms of Service', route: '/terms-of-service' },
  { title: 'Privacy Policy', route: '/privacy-policy' },
];

const App = () => {
  const [auth, setAuth] = useState({
    user: undefined,
    follower: undefined,
  });
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      const geo = await getGeo();
      localStorage.setItem('geo', JSON.stringify(geo));

      //first page view
      reportMongoDBEvent('Pageview', {
        page: history.location.pathname,
        referrer: document.referrer,
      });
    };
    init();
    // eslint-disable-next-line
  }, []);

  useEffect(
    history.listen((location) => {
      reportMongoDBEvent('Pageview', {
        page: location.pathname,
        referrer: document.referrer,
      });
      TrackPixelPageView();
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    }),
    [history]
  );

  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <authContext.Provider value={{ ...auth, setAuth }}>
        <ScrollToTop />
        <Switch>
          <Route path='/' exact render={() => <LandingTwo />} />
          {/* <Route path='/landing' exact render={() => <LandingTwo />} /> */}
          <Route path='/artist/:id' exact render={() => <Link />} />
          <Route path='/guides' exact component={Guides} />
          <Route path='/article/:id' exact component={Article} />
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
          <PrivateRoute path='/releases/new' exact component={CreateRelease} />
          <PrivateRoute path='/profile' exact component={EditLink} />
          {/* <PrivateRoute path='/introduction' exact component={Introduction} /> */}
          <PrivateRoute
            path='/find-artist-uri'
            exact
            component={ArtistURIExplained}
          />
          <PrivateRoute
            path='/find-deezer-link'
            exact
            component={DeezerExplained}
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
          <PrivateRoute path='/presave/edit' exact component={EditPresave} />
          <PrivateRoute path='/presave/new' exact component={CreatePresave} />
          <PrivateRoute path='/help' exact component={Help} />
          <PrivateRoute path='/accounts' exact component={LinkAccounts} />
          {/* <PrivateRoute path='/follower' exact component={Followers} /> */}
          <Route render={() => <Redirect to='/home' />} />
        </Switch>
      </authContext.Provider>
    </ToastProvider>
  );
};

export default App;
