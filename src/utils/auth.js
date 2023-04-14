

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
      console.log(response, response.status);
      try {
        if (response.status === 200 || 201) {
          return response.json();
        }
      } catch (e) {
        console.log(e);
        return (e)
      }
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err))
}

// sasha86@yandex.com
// 1234

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
      console.log(data.token);
    })
    .catch(err => console.log(err))
}


// data: {
// email: "sash86@yandex.ru",
// _id: "64391b6ad4567c00131ebd2d"
// }

// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM5MWMxY2Q0NTY3YzAwMTMxZWJkMmYiLCJpYXQiOjE2ODE0Njc1MzB9.GJYqHlyNRwgzyiW71en3Ff7qIsxJst-4WjFCKmHrJkw'

// data: {
// email: "sasha86@yandex.ru",
// _id: "64391c1cd4567c00131ebd2f"
// }