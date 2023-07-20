import CreckResponse from './CheckResponse';

class Auth extends CreckResponse {
  constructor(configFetch) {
    super();
    this.url = configFetch.url;
    this.headers = configFetch.headers;
    this._creckResponse = super._creckResponse;
  }
  //зарегистрировать пользователя
  requestUser({ email, password, endPoint }) {
    return fetch(`${this.url}${endPoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      return this._creckResponse(res);
    });
  }

  //проверка токена
  chekTokenUser(token) {
    return fetch(`${this.url}users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._creckResponse(res);
    });
  }
}

const auth = new Auth({
  url: 'https://auth.nomoreparties.co/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default auth;
