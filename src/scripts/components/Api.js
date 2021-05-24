export default class Ari {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      });
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.activity
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`));
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`));
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`));
  }

}
