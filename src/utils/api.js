import CreckResponse from './CheckResponse';

class Api extends CreckResponse {
  constructor(configFetch) {
    super();
    this._creckResponse = super._creckResponse;
    this.url = configFetch.url;
    this.headers = configFetch.headers;
  }
  //получить информацию о пользователн
  getInfoUser() {
    return fetch(`${this.url}users/me`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      return this._creckResponse(res);
    });
  }
  //получить карточки
  getCard() {
    return fetch(`${this.url}cards`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      return this._creckResponse(res);
    });
  }
  //установить новые данные о пользователе
  setUserData(userData) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._creckResponse(res);
    });
  }
  //установить новую карточку
  setNewCadr({ name, link }) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then((res) => {
      return this._creckResponse(res);
    });
  }
  //удалить карточку
  deleteCard(idCard) {
    return fetch(`${this.url}cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      return this._creckResponse(res);
    });
  }
  // обработать клик по лайку (поставить/убрать)
  changeLikeCardStatus(idCard, statusLike) {
    const changeFetch = statusLike ? 'DELETE' : 'PUT';
    return fetch(`${this.url}cards/${idCard}/likes`, {
      method: changeFetch,
      headers: this.headers,
    }).then((res) => {
      return this._creckResponse(res);
    });
  }

  //установить новый аватар
  setAvatar(urlAvatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar: urlAvatar }),
    }).then((res) => {
      return this._creckResponse(res);
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
