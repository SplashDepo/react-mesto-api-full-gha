import { apiAuthorization } from "./apiAuthorization";

class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers
    })
      .then((res) => { return this._serverResponse(res) })
  }

  sendUserData(userName, userDescription) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: userName, about: userDescription })
    })
      .then((res) => { return this._serverResponse(res) })
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers
    })
      .then((res) => { return this._serverResponse(res) })
  }

  addCard(name, link) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then((res) => { return this._serverResponse(res) })
  }
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then((res) => { return this._serverResponse(res) })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT'
      })
        .then((res) => { return this._serverResponse(res) })
    } else {
      return fetch(`${this._link}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE'
      })
        .then((res) => { return this._serverResponse(res) })
    }
  }



  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then((res) => { return this._serverResponse(res) })
  }
}

const apiConnect = new Api(apiAuthorization)

export { apiConnect }