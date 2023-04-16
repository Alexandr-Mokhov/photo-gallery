import checkResponse from './checkResponse';

export const BASE_URL = 'https://auth.nomoreparties.co';

// function request(url, options) {                    // на счет этой функции пока не разобрался
//   return fetch(url, options).then(checkResponse)    // я так понял что это из разряда - "можно лучше"
// }                                                   // постараюсь на днях разобраться как ее применить

export const registerUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse);
}

export const authorizeUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse);
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(checkResponse);
}
