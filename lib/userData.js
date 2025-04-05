import { getToken } from "./authenticate";

async function makeRequest(url, method = "GET") {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const token = getToken();

  console.log(`[userData] ${method} ${fullUrl}`);
  console.log(`[userData] JWT: ${token}`);

  const res = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  console.log(`[userData] Response Status: ${res.status}`);

  if (res.status === 200) {
    const json = await res.json();
    console.log(`[userData] Response JSON:`, json);
    return json;
  } else {
    const errMsg = await res.text();
    console.error(`[userData] Failed Request: ${res.status}`, errMsg);
    return [];
  }
}

export async function addToFavourites(id) {
  return makeRequest(`/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return makeRequest(`/favourites/${id}`, "DELETE");
}

export async function getFavourites() {
  return makeRequest("/favourites");
}

export async function addToHistory(id) {
  return makeRequest(`/history/${id}`, "PUT");
}

export async function removeFromHistory(id) {
  return makeRequest(`/history/${id}`, "DELETE");
}

export async function getHistory() {
  return makeRequest("/history");
}
