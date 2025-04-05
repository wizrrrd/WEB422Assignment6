import { useRouter } from 'next/router';
import { removeToken, readToken } from '@/lib/authenticate';
import { Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href="/" passHref>
            <Nav.Link active={router.pathname === '/'}>Home</Nav.Link>
          </Link>
          {token ? (
            <>
              <Link href="/search" passHref>
                <Nav.Link active={router.pathname === '/search'}>Advanced Search</Nav.Link>
              </Link>
              <Link href="/favourites" passHref>
                <Nav.Link active={router.pathname === '/favourites'}>Favourites</Nav.Link>
              </Link>
              <Link href="/history" passHref>
                <Nav.Link active={router.pathname === '/history'}>Search History</Nav.Link>
              </Link>
              <NavDropdown title={token.userName}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Link href="/register" passHref>
                <Nav.Link active={router.pathname === '/register'}>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref>
                <Nav.Link active={router.pathname === '/login'}>Login</Nav.Link>
              </Link>
            </>
          )}
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}