import { useState } from "react";
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

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    try {
      console.log("[Login] Updating favourites and history atoms...");
      const favs = await getFavourites();
      const history = await getHistory();
      setFavouritesList(favs);
      setSearchHistory(history);
    } catch (err) {
      console.error("[Login] Failed to update atoms:", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("[Login] Attempting login...");
      const success = await authenticateUser(user, password);

      if (success) {
        console.log("[Login] Login successful.");
        await updateAtoms();
        router.push("/favourites");
      }
    } catch (err) {
      console.error("[Login] Login failed:", err.message);
      setWarning("Invalid username or password.");
    }
  };

  return (
    <Card bg="light" className="p-4">
      <Card.Body>
        <h2 className="mb-4">Login</h2>
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

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
