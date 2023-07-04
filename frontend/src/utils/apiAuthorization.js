const apiAuthorization = {
  link: 'http://api.mesto.splash.nomoreparties.sbs/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
}

export { apiAuthorization }