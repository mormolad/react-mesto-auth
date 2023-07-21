import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import { useForm } from 'react-hook-form';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const {
    register,
    formState: { errors },
    handleSubmitt,
  } = useForm();
  //управление полями имя и род занятия
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  //обработка поля имени
  function handleChangeName(e) {
    setName(e.target.value);
  }
  // обработака поля рода деятельности
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  //обработчик кнопки Сохранить в форме
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-user"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      errors={errors}
    >
      <div className="popup__form-section">
        <input
          {...register('UserName', {
            required: 'Обязательно к запалнению',
            minLength: {
              value: 2,
              message: 'Минимум 5 символов',
            },
            maxLength: {
              value: 2,
              message: 'Максимум 40 символов',
            },
          })}
          type="text"
          className="popup__field"
          id="input-user-name"
          name="inputUserName"
          placeholder="Имя автора"
          onChange={handleChangeName}
          value={name ?? ''} // что бы компонент сразу был управляемым
        />
        <span className="popup__message-error"></span>
      </div>
      <div className="popup__form-section">
        <input
          type="text"
          className="popup__field"
          id="input-user-employment"
          name="inputUserEmployment"
          minLength="2"
          maxLength="200"
          placeholder="Род деятельности"
          onChange={handleChangeDescription}
          value={description ?? ''} // что бы компонент сразу был управляемым
          required
        />
        <span className="popup__message-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
