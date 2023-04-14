

export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => {
      // console.log(response, response.status);
      try {
        if (response.status === 200 || 201) {
          return response.json();
        }
      } catch (e) {
        return (e)
      }
    })
    .then((data) => {
      return data;
    })
    .catch(err => console.log(err));
}

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('token', data.token);
      // console.log(data.token);
    })
    .catch(err => console.log(err))
}

export const usersMe = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      // console.log(response, response.status);
      try {
        if (response.status === 200 || 201) {
          return response.json();
        }
      } catch (e) {
        return (e)
      }
    })
    .then((data) => {
      return data;
    })
    .catch(err => console.log(err));
}
