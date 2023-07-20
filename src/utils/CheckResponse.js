export default class CreckResponse {
  constructor() {}
  _creckResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
