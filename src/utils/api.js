class Api {
  constructor(configFetch) {
    this.url = configFetch.url;
    this.headers = configFetch.headers;
  }
  //получить информацию о пользователн
  getInfoUser() {
    return fetch(`${this.url}users/me`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //получить карточки
  getCard() {
    return fetch(`${this.url}cards`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //установить новые данные о пользователе
  setUserData(userData) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //установить новую карточку
  setNewCadr({ name, link }) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //удалить карточку
  deleteCard(idCard) {
    return fetch(`${this.url}cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  // обработать клик по лайку (поставить/убрать)
  changeLikeCardStatus(idCard, statusLike) {
    const changeFetch = statusLike ? 'DELETE' : 'PUT';
    return fetch(`${this.url}cards/${idCard}/likes`, {
      method: changeFetch,
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //установить новый аватар
  setAvatar(urlAvatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar: urlAvatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //зарегистрировать пользователя
  registerUser({ email, password }) {
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: 'POST',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //зарегистрировать пользователя
  loginUser({ email, password }) {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //проверка токена
  chekTokenUser(token) {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66/',
  headers: {
    'Content-Type': 'application/json',
    authorization: '4d34c841-0266-4e27-9ed8-f76bb6fb7087',
  },
});

export default api;
