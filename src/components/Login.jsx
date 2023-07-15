import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import api from '../utils/api';
import { Link } from 'react-router-dom';

import React from 'react';

function Login({ setLoggedIn, loggedIn }) {
  function handleSubmit({ email, password }) {
    api
      .loginUser({ email, password })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header title={'Регистрация'} loggedIn={loggedIn} route={'sign-up'} />
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
