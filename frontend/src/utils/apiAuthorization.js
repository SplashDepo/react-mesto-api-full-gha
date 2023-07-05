const apiAuthorization = {
  link: 'http://localhost:3001/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
}

export { apiAuthorization }