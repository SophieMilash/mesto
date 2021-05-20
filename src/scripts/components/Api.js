export default class Ari {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`)
      .then(result => result.json())
  }

  createSmth(dara) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {

      }
    })
      .then(result => result.json())
      .then(data => console.log(data))
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users`, {
      headers:  this._headers
    })
      .then(result => result.json())
  }
}
