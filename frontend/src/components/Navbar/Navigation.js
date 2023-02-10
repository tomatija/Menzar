import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Navigation() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <Link className="text-decoration-none text-black" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link className="text-decoration-none text-black" to="/diners">
                Diners
              </Link>
            </Nav.Link>
            <Nav.Link href="#home">
              <Link className="text-decoration-none text-black" to="/dashboard">
                Dashboard
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link className="text-decoration-none text-black" to="/login">
                Login
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link className="text-decoration-none text-black" to="/signup">
                Sign up
              </Link>
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default Navigation;