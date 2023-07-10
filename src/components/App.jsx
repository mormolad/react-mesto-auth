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
  const hist = useNavigate();

  function auth(jwt) {
    api
      .chekTokenUser(jwt)
      .then((res) => {
        console.log(jwt, 'из апп ', res);
        if (res) {
          setLoggedIn(true);
          console.log(loggedIn, '= loger');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth(jwt);
    }
  }, []);

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
            <ProtectedRoute element={AuthUserPage} loggedIn={loggedIn} />
          }
        />
        <Route path="/sign-up" element={<Register hist={hist} />} />
        <Route path="/sign-in" element={<Login hist={hist} />} />
      </Routes>
    </div>
  );
}

export default App;
