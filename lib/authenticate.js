import jwt_decode from "jwt-decode"; 


export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("token");
  }
  return null;
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function readToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwt_decode(token);
    console.log("[Auth] Decoded Token:", decoded);
    return decoded;
  } catch (err) {
    console.error("[Auth] Failed to decode token:", err.message);
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token !== null;
}

export async function authenticateUser(user, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: user, password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log("[Auth] JWT Token received:", data.token);
      setToken(data.token);
      return true;
    } else {
      const err = await res.json();
      console.warn("[Auth] Login failed:", err.message);
      throw new Error(err.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("[Auth] authenticateUser error:", err.message);
    throw err;
  }
}

export async function registerUser(user, password, password2) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: user, password, password2 }),
    });

    if (res.status === 200) {
      console.log("[Auth] Registration successful");
      return true;
    } else {
      const error = await res.json();
      console.warn("[Auth] Registration failed:", error.message);
      throw new Error(error.message || "Registration failed");
    }
  } catch (err) {
    console.error("[Auth] registerUser error:", err.message);
    throw err;
  }
}
