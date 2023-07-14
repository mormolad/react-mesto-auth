import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import api from '../utils/api';
import { Link } from 'react-router-dom';

import React from 'react';

function Login({ setLoggedIn, setEmailUser }) {
  function handleSubmit({ email, password }) {
    api
      .loginUser({ email, password })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setEmailUser(email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header
        element={
          <Link to="/sign-up" className="header__nav-link">
            Зарегистрироваться
          </Link>
        }
      />
      <NotLogin
        title={'Вход'}
        buttonText={'Войти'}
        subTextButtonElement={''}
        name={'login'}
        onSubmit={handleSubmit}
      />
      <Footer />
    </>
  );
}

export default Login;
