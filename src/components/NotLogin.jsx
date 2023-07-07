import { Link } from 'react-router-dom';

function NotLogin({ title, buttonText, subButtonText, name }) {
  return (
    <div className="not-login-page">
      <h1 className="not-login-page__title">{title}</h1>
      <form
        className={`not-login-page__content not-login-page__content_${name}`}
        name={`form-not-login-page-${name}`}
        id={`content-not-login-page-${name}`}
        //onSubmit={onSubmit}
        noValidate
      >
        <div className="not-login-page__form-section">
          <input
            type="text"
            className="not-login-page__field"
            id="input-email"
            name="inputUserEmail"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            // onChange={handleChangeName}
            value={''} // что бы компонент сразу был управляемым
            required
          />
          <span className="not-login-page__message-error"></span>
        </div>
        <div className="not-login-page__form-section">
          <input
            type="text"
            className="not-login-page__field"
            id="input-password"
            name="inputPassword"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            // onChange={handleChangeDescription}
            value={''} // что бы компонент сразу был управляемым
            required
          />
          <span className="popup__message-error"></span>
        </div>
        <button
          type="submit"
          title={title}
          className="not-login-page__submit"
          id="button-submit-user-data"
        >
          {buttonText}
        </button>
        <Link to="/sign-in" className="not-login-page__sub-text-button">
          {subButtonText}
        </Link>
      </form>
    </div>
  );
}

export default NotLogin;
