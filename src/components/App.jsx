import '../index.css';
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import UserPage from './UserPage';
import Login from './Login';
import Register from './Register';
import { useEffect } from 'react';
import auth from '../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState('');
  const navigate = useNavigate();

  function chekToken(jwt) {
    auth
      .chekTokenUser(jwt)
      .then((res) => {
        setEmailUser(res.data.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      chekToken(localStorage.jwt);
    }
  }, []);

  useEffect(() => {
    console.log('logginIN в App', loggedIn);
    if (loggedIn) {
      console.log(loggedIn, 'if true');
      navigate('/', { replace: true });
    } else {
      console.log(loggedIn, 'if false');
      navigate('/sign-in', { replace: true });
    }
  }, [loggedIn]);

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={UserPage}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              emailUser={emailUser}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register navigate={navigate} loggedIn={loggedIn} />}
        />
        <Route
          path="/sign-in"
          element={
            <Login
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              setEmailUser={setEmailUser}
            />
          }
        />
        <Route
          path="/*"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
