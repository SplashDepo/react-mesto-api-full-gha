class AuthApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  _serverRespones(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  tokenVerefication(token) {
    return fetch(`${this._baseUrl}users/me`, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => this._serverRespones(res))
  }

  register({ password, email }) {
    return fetch(`${this._baseUrl}signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._serverRespones(res))
  }

  authorize({ password, email }) {
    return fetch(`${this._baseUrl}signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._serverRespones(res))
  }

}


const apiAuth = new AuthApi('https://api.mesto.splash.nomoreparties.sbs/')

export { apiAuth }



