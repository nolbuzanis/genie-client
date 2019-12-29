import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/LogIn';
import authContext from './Context/authContext';
// import Dashboard from './components/Dashboard';
import Signup from './views/SignUp';
import Header from './components/Header';
// import { connect } from 'react-redux';
// import { getCurrentUser } from './actions';
import Landing from './views/Landing';
import history from './history';
import { getCurrentUser } from './api';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
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

const App = () => {
  const [auth, setAuth] = React.useState(undefined);
  if (!auth) {
    getCurrentUser().then(setAuth);
    return 'loading...';
  }

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
    <authContext.Provider value={{ auth, setAuth }}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router history={history}>
          <Header user={auth.error ? undefined : auth} />
          <Switch>
            <Route path='/' exact render={() => <Landing />} />
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

// class App extends React.Component {
//   componentDidMount() {
//     if (!this.props.auth.user) {
//       console.log('Fetching current user');
//       this.props.getCurrentUser();
//     }
//   }

//   render() {
//     // if (!this.props.auth.user) {
//     //   return 'loading...';
//     // }
//     return (
//       <div className='App'>
//         <Router history={history}>
//           <Switch>
//             <Route path='/artists/:artistId' exact component={PublicProfile} />
//             <Header />
//           </Switch>
//           <Switch>
//             <Route path='/' exact component={Landing} />
//             <Route path='/login' exact component={Login} />
//             <Route path='/reset' exact component={ResetPassword} />
//             <Route path='/reset/:token' exact component={NewPassword} />
//             <Route path='/signup' exact component={SignUp} />
//             <Route path='/account' exact component={requireAuth(Account)} />
//             {/* <Route path='/dashboard' exact component={requireAuth(Dashboard)} /> */}
//             <Route path='/blasts' exact component={requireAuth(Blasts)} />
//             <Route path='/profile' exact component={requireAuth(EditProfile)} />
//             <Route
//               path='/myfollowers'
//               exact
//               component={requireAuth(MyFollowers)}
//             />
//             <Route path='/blasts/new' exact component={requireAuth(NewBlast)} />
//             <Route
//               path='/blasts/all'
//               exact
//               component={requireAuth(AllBlasts)}
//             />
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// }

export default App;
