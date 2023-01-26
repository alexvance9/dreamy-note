import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginFormModal from './components/auth/LoginFormModal';
// import SignUpForm from './components/auth/SignUpFormModal';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Dashboard from './components/Dashboard';
import DreamsTab from './components/DreamsTab';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className={sessionUser ? 'app-con' : 'splash-con' }>
      <NavBar loaded={loaded}/>
      {loaded && (
      <Switch>
        <ProtectedRoute path='/dreams' exact={true} >
          <DreamsTab/>
        </ProtectedRoute>
        <ProtectedRoute path='/dreams/:dreamId' exact={true} >
          <DreamsTab />
        </ProtectedRoute>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>Welcome to dreamy note</h1>
        </Route>
      </Switch>
      )}
    </div>
  );
}

export default App;
