

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
        if (response.status === 200) {
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