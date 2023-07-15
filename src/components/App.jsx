import '../index.css';
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthUserPage from './AuthUserPage';
import Login from './Login';
import Register from './Register';
import { useEffect } from 'react';
import api from '../utils/api';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState('');
  const navigate = useNavigate();

  function auth(jwt) {
    api
      .chekTokenUser(jwt)
      .then((res) => {
        console.log('email - ', res.data.email);
        setEmailUser(res.data.email);
        setLoggedIn(true);
        console.log('loggedIn', loggedIn, 'emailUser', emailUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      auth(localStorage.jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      console.log(localStorage.getItem('jwt'), '    ');
      auth(localStorage.jwt);
      navigate('/', { replace: true });
    }
  }, [loggedIn]);

  return (
    <div className="page">
      <Routes>
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
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={AuthUserPage}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              emailUser={emailUser}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register navigate={navigate} loggedIn={loggedIn} />}
        />
        <Route
          path="/sign-in"
          element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
