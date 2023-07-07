import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import api from '../utils/api';

import React from 'react';

function Login() {
  return (
    <>
      <Header />
      <NotLogin
        title={'Вход'}
        buttonText={'Войти'}
        subButtonText={''}
        name={'login'}
      />
      <Footer />
    </>
  );
}

export default Login;
