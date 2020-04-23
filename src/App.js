import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/LogIn';
import authContext from './Context/authContext';
//import Dashboard from './views/Dashboard';
import Signup from './views/SignUp';
import Header from './components/Header';
import Landing from './views/Landing';
import history from './history';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import Artist from './views/Artist';
import Releases from './views/Releases';
import EditProfile from './views/EditProfile';
import Introduction from './views/Introduction';
import ResetPassword from './views/ResetPassword';
import NewRelease from './views/NewRelease';
import GetStarted from './views/GetStarted';
import ArtistURIExplained from './views/ArtistURIExplained';
import ExtendedMenu from './views/ExtendedMenu';
import Home from './views/Home';
import ScrollToTop from './components/ScrollToTop';
// import NewPassword from './components/NewPassword';
// import Account from './components/Account';
// import MyFollowers from './components/MyFollowers';
import './App.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/Alert';
//import PublicRoute from './components/PublicRoute';
import ReactGA from 'react-ga';

const App = () => {
  const [auth, setAuth] = React.useState({ user: undefined, follower: undefined });

  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });

  const alertOptions = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 4000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
    containerStyle: {
      width: "100%"
    }
  };
  return (
    <authContext.Provider value={{ ...auth, setAuth }}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route path='/' exact render={() => <Landing />} />
            <Route path='/artist/:id' exact render={() => <Artist />} />
            <AuthRoute path='/login' exact component={Login} />
            <AuthRoute path='/signup' exact component={Signup} />
            <AuthRoute path='/get-started' exact component={GetStarted} />
            <Route path='/forgot-password' exact render={() => <ResetPassword />} />
            <PrivateRoute path='/home' exact component={Home} />
            <PrivateRoute path='/releases' exact component={Releases} />
            <PrivateRoute path='/releases/new' exact component={NewRelease} />
            <PrivateRoute path='/profile' exact component={EditProfile} />
            <PrivateRoute path='/introduction' exact component={Introduction} />
            <PrivateRoute path='/find-artist-uri' exact component={ArtistURIExplained} />
            <PrivateRoute path='/menu' exact component={ExtendedMenu} />
            <Route render={() => <Redirect to='/home' />} />
          </Switch>
        </BrowserRouter>
      </AlertProvider>
    </authContext.Provider>
  );
};

export default App;
