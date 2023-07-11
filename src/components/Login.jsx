import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import api from '../utils/api';
import { Link } from 'react-router-dom';

import React from 'react';

function Login({ hist }) {
  function handleSubmit({ email, password }) {
    // Передаём значения управляемых компонентов во внешний обработчик
    api
      .loginUser({ email, password })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        hist('/');
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
