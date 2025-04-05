/*import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userData";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  
  async function updateAtoms() {
    console.log("[Login] Updating favourites and history atoms...");
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("[Login] Attempting login...");
      const success = await authenticateUser(user, password);

      if (success) {
        console.log("[Login] Login successful. Redirecting to /favourites");
        await updateAtoms();
        router.push("/favourites");
      }
    } catch (err) {
      console.error("[Login] Login failed:", err.message);
      setWarning("Invalid username or password.");
    }
  };

  return (
    <Card bg="secondary">
      <Card.Body>
        <br></br>
        <h2>Login Page</h2>
        {warning && <Alert variant="danger">{warning}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
*/

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    try {
      const favs = await getFavourites();
      const history = await getHistory();
      setFavouritesList(favs);
      setSearchHistory(history);
    } catch (err) {
      console.error('[RouteGuard] Failed to update atoms:', err);
    }
  }

  async function checkAuth(url) {
    const path = url.split('?')[0];
    const isPublic = PUBLIC_PATHS.includes(path);

    if (!isAuthenticated() && !isPublic) {
      console.log('[RouteGuard] Not authenticated. Redirecting to /login');
      setAuthorized(false);
      router.push('/login');
    } else {
      if (isAuthenticated()) {
        await updateAtoms();
      }
      setAuthorized(true);
    }
  }

  useEffect(() => {
    checkAuth(router.asPath);

    router.events.on('routeChangeComplete', checkAuth);
    return () => {
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, []);

  return authorized || PUBLIC_PATHS.includes(router.pathname) ? children : null;
}
