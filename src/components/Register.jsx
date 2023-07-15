import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Register() {
  const [isStatusAuthPopupOpen, setIsStatusAuthPopupOpen] = useState(false);
  const [titlePopup, setTitlePopup] = useState('');
  const [registerStatus, setRegisterStatus] = useState(false);
  function handleSubmit({ email, password }) {
    // Передаём значения управляемых компонентов во внешний обработчик
    api
      .registerUser({ email, password })
      .then((res) => {
        setTitlePopup('Вы успешно зарегистрировались!');
        setIsStatusAuthPopupOpen(true);
        setRegisterStatus(true);
      })
      .catch((err) => {
        setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.');
        setIsStatusAuthPopupOpen(true);
        setRegisterStatus(false);
        console.log(err);
      });
  }
  const closePopup = () => {
    setIsStatusAuthPopupOpen(false);
  };

  return (
    <>
      <Header title={'Войти'} route={'sign-in'} />
      <NotLogin
        title={'Регистрация'}
        buttonText={'Зарегистрироваться'}
        subTextButtonElement={
          <p className="not-login-page__sub-text-button">
            Уже зарегистрированы?{' '}
            <Link to="/sign-in" className="not-login-page__sub-text-button">
              Войти
            </Link>
          </p>
        }
        name={'register'}
        onSubmit={handleSubmit}
      />
      <Footer />
      <InfoTooltip
        title={titlePopup}
        isOpen={isStatusAuthPopupOpen}
        onClose={closePopup}
        registerStatus={registerStatus}
      />
    </>
  );
}

export default Register;
