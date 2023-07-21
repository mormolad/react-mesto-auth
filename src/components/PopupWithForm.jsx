import React from 'react';
import { useForm } from 'react-hook-form';

function PopupWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  errors,
}) {
  //установка слушателя для закрытия попапа по кнопке esc и последущее его удаление при закрытии
  React.useEffect(() => {
    if (!isOpen) return;
    function clickEsc(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', clickEsc);
    return () => document.removeEventListener('keydown', clickEsc);
  }, [isOpen, onClose]);

  //закрыть попап при клике по оверлею
  function clickOverley(evt) {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }
  const handleChange = () => {
    console.log(errors);
  };

  return (
    <div
      className={`popup popup_${name} ${
        isOpen === true ? 'popup_enable' : ' '
      }`}
      id={`popup-${name}`}
      title="модальное окно редактирования"
      onClick={clickOverley}
    >
      <form
        className={`popup__content popup__content_${name}`}
        name={`form-popup-${name}`}
        id={`content-popup-${name}`}
        onSubmit={onSubmit}
        onChange={handleChange}
        noValidate
      >
        <h3 className="popup__title" id={`title-popup-${name}`}>
          {title}
        </h3>
        {children}
        <button
          type="submit"
          title={`${buttonText} информацию`}
          className="popup__submit"
        >
          {buttonText}
        </button>
        <button
          type="button"
          title="закрыть модальное окно"
          className="popup__close-popup"
          id="button-close-popup-edit-user"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
