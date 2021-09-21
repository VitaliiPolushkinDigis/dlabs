import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  logout,
  getAll,
};

async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(
    `http://localhost:4000/users/authenticate`,
    requestOptions
  );
  const user = await handleResponse(response);
  if (user) {
    user.authdata = window.btoa(email + ':' + password);
    localStorage.setItem('user', JSON.stringify(user));
  }
  return user;
}

function logout() {
  localStorage.removeItem('user');
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`http://localhost:4000/users`, requestOptions);
  return handleResponse(response);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
