const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'e80cbcbe-f719-4921-a30f-8e0ec3c72a1d', // Токен
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  setUserInfo(userNameData, dataUserAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userNameData,
        about: dataUserAbout
      })
    })
      .then(this._handleResponse);
  }

  setUserAvatar(dataAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataAvatar
      })
    })
      .then(this._handleResponse);
  }

  addNewCard(nameCard, linkCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(this._handleResponse);
  }

  deleteUserCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, noLike) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${noLike ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
      .then(this._handleResponse);
  }
}

const api = new Api(options);

export default api;