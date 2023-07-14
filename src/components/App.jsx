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
        setEmailUser(res.data.email);
        setLoggedIn(true);
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
    if (loggedIn) navigate('/', { replace: true });
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
              emailUser={emailUser}
              navigate={navigate}
            />
          }
        />
        <Route path="/sign-up" element={<Register navigate={navigate} />} />
        <Route
          path="/sign-in"
          element={
            <Login setLoggedIn={setLoggedIn} setEmailUser={setEmailUser} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
