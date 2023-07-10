import Header from './Header';
import Footer from './Footer';
import NotLogin from './NotLogin';
import api from '../utils/api';
import { Link } from 'react-router-dom';
function Register({ hist }) {
  // history = useHistory();
  function handleSubmit({ email, password }) {
    // Передаём значения управляемых компонентов во внешний обработчик
    api
      .registerUser({ email, password })
      .then((data) => {
        hist('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Header
        element={
          <Link to="/sign-in" className="header__nav-link">
            Войти
          </Link>
        }
      />
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
    </>
  );
}

export default Register;
