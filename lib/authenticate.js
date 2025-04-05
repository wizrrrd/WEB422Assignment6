import jwtDecode from 'jwt-decode';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Save the token to localStorage
export function setToken(token) {
  localStorage.setItem('token', token);
}

// Get the token from localStorage
export function getToken() {
  return localStorage.getItem('token');
}

// Remove the token from localStorage (logout)
export function removeToken() {
  localStorage.removeItem('token');
}

// Decode the token to extract user info
export function readToken() {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  } else {
    return null;
  }
}

// Check if the user is authenticated
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

// Authenticate a user and store token if successful
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

// Register a new user (does not set token on success)
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
