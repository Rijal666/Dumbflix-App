/** @format */

import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import ModalLogin from "../components/ModalLogin";
import { useState } from "react";
import ModalRegister from "../components/ModalRegister";

function Navbars() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowLogin = () => {
    handleClose(true);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    handleClose(true);
    setShowRegister(true);
  };

  return (
    <>
      <ModalLogin
        show={showLogin}
        onHide={handleClose}
        onClick={handleShowRegister}
      />
      <ModalRegister
        show={showRegister}
        onHide={handleClose}
        onClick={handleShowLogin}
      />
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Home</Nav.Link>
                <Nav.Link href="#pricing">TV Show</Nav.Link>
                <NavDropdown title="Movies" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Movies</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Nav>
          <Navbar.Brand href="#home" className="d-flex justify-content-center">
            <img src="/images/icon.svg" />
          </Navbar.Brand>
          <Nav>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="gap-4">
                <Button
                  variant="light"
                  color="danger"
                  className="text-danger fw-bold"
                  onClick={handleShowRegister}
                >
                  Register
                </Button>
                <Button
                  variant="danger"
                  className="fw-bold px-4"
                  onClick={handleShowLogin}
                >
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
