import jwtDecode from 'jwt-decode';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function readToken() {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: user, password })
  });

  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token);
    return true;
  } else {
    throw new Error('Invalid username or password');
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: user, password, password2 })
  });

  if (res.status === 200) {
    return true;
  } else {
    const errData = await res.json();
    throw new Error(errData.message || 'Registration failed');
  }
}
