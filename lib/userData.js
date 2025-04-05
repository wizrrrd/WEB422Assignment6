import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => ({
  Authorization: `JWT ${getToken()}`
});

export async function addToFavourites(id) {
  try {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: getAuthHeaders()
    });
    return res.status === 200 ? res.json() : [];
  } catch {
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    return res.status === 200 ? res.json() : [];
  } catch {
    return [];
  }
}

export async function getFavourites() {
  try {
    const res = await fetch(`${API_URL}/favourites`, {
      headers: getAuthHeaders()
    });
    return res.status === 200 ? res.json() : [];
  } catch {
    return [];
  }
}

export async function addToHistory(id) {
  try {
    const res = await fetch(`${API_URL}/history/${id}`, {
      method: "PUT",
      headers: getAuthHeaders()
    });
    return res.status === 200 ? res.json() : [];
  } catch {
    return [];
  }
}

export async function removeFromHistory(id) {
  try {
    const res = await fetch(`${API_URL}/history/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    return res.status === 200 ? res.json() : [];
  } catch {
    return [];
  }
}

export async function getHistory() {
  try {
    const res = await fetch(`${API_URL}/history`, {
      headers: getAuthHeaders()
    });
    return res.status === 200 ? res.json() : [];
  } catch {
    return [];
  }
}
