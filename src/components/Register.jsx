import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import api from '../utils/api';

import React from 'react';

function Register() {
  return (
    <>
      <Header />
      <NotLogin
        title={'Регистрация'}
        buttonText={'Зарегистрироваться'}
        subButtonText={'Уже зарегистрированы? Войти'}
        name={'register'}
      />
      <Footer />
    </>
  );
}

export default Register;
