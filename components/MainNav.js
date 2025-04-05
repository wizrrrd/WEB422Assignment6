

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { readToken, removeToken } from '@/lib/authenticate';
import { addToHistory } from "@/lib/userData";


export default function MainNav() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const queryString = `title=true&q=${search}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Aditi Sharma-Assignment 6</Navbar.Brand>
          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type="submit" variant="success">Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token.userName} id="user-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}

            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
}
