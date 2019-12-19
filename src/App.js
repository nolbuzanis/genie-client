import React from 'react';
// import { Router, Route, Redirect, Switch } from 'react-router-dom';
// import Login from './views/LogIn';
// import Dashboard from './components/Dashboard';
// import SignUp from './views/SignUp';
// import Header from './components/Header';
// import { connect } from 'react-redux';
// import { getCurrentUser } from './actions';
// import Landing from './views/Landing';
// import history from './history';
// import Blasts from './components/Blasts';
// import NewBlast from './components/NewBlast';
// import PublicProfile from './components/PublicProfile';
// import AllBlasts from './views/AllBlasts';
// import EditProfile from './views/EditProfile';
// import requireAuth from './components/requireAuth';
// import ResetPassword from './views/ResetPassword';
// import NewPassword from './components/NewPassword';
// import Account from './components/Account';
// import MyFollowers from './components/MyFollowers';
import './App.css';

const App = () => {
  return <div>Some App</div>;
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
