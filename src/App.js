import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/LogIn';
import authContext from './Context/authContext';
// import Dashboard from './components/Dashboard';
import Signup from './views/SignUp';
import Header from './components/Header';
import Landing from './views/Landing';
import history from './history';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import Artist from './views/Artist';
// import Blasts from './components/Blasts';
// import NewBlast from './components/NewBlast';
// import PublicProfile from './components/PublicProfile';
// import AllBlasts from './views/AllBlasts';
import EditProfile from './views/EditProfile';
import Introduction from './views/Introduction';
// import requireAuth from './components/requireAuth';
import ResetPassword from './views/ResetPassword';
// import NewPassword from './components/NewPassword';
// import Account from './components/Account';
// import MyFollowers from './components/MyFollowers';
import './App.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/Alert';
//import PublicRoute from './components/PublicRoute';

const App = () => {
  const [auth, setAuth] = React.useState({ user: undefined, follower: undefined });

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

  //console.log(auth);
  return (
    <authContext.Provider value={{ ...auth, setAuth }}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path='/' exact render={() => <Landing />} />
            <Route path='/artist/:id' exact render={() => <Artist />} />
            <AuthRoute path='/login' exact component={Login} />
            <AuthRoute path='/signup' exact component={Signup} />
            <Route path='/forgot-password' exact render={() => <ResetPassword />} />
            <PrivateRoute path='/profile' exact component={EditProfile} />
            <PrivateRoute path='/introduction' exact component={Introduction} />
            <Route render={() => <Redirect to='/profile' />} />
          </Switch>
        </Router>
      </AlertProvider>
    </authContext.Provider>
  );
};

export default App;
