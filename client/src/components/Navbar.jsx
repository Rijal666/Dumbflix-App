/** @format */

import {
  Container,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import ModalLogin from "../components/ModalLogin";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import Swal from "sweetalert2";
import { useState, useContext, useEffect } from "react";
import ModalRegister from "../components/ModalRegister";

function Navbars() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state, dispatch] = useContext(UserContext);

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

  useEffect(() => {
    // Redirect auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success : ", response);
      // get user data
      let payload = response.data.data;
      // get token from localstorage
      payload.token = localStorage.token;
      // send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
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
          {state.isLogin === true ? (
            state.user.is_admin === true ? (
              <>
                <Navbar.Brand
                  href="#home"
                  className="d-flex justify-content-center"
                >
                  <img src="/images/icon.svg" />
                </Navbar.Brand>
                <NavDropdown
                  menuVariant="dark"
                  title={
                    <img
                      src="/images/blank-profile.png"
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "solid orange",
                      }}
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                      className="rounded-circle me-4"
                    />
                  }
                >
                  <NavDropdown.Item href="/IncomeTrip">
                    <img
                      src="/images/film.svg"
                      alt=""
                      style={{ width: "20px" }}
                    />
                    <span className="ms-3 fw-bold">Film</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} href="/">
                    {" "}
                    <img
                      src="/images/logout.svg"
                      alt=""
                      style={{ width: "20px" }}
                    />
                    <span className="ms-3 fw-bold">Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav>
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/Series">TV Series</Nav.Link>
                      <Nav.Link href="/Movies">Movies</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Nav>
                <Navbar.Brand
                  href="#home"
                  className="d-flex justify-content-center"
                >
                  <img src="/images/icon.svg" />
                </Navbar.Brand>
                <Nav>
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <NavDropdown
                      menuVariant="dark"
                      title={
                        <img
                          // src={state.user.image ? state.user.image : ImgProfile}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            border: "solid orange",
                          }}
                          className="rounded-circle me-2"
                        />
                      }
                    >
                      <NavDropdown.Item href="/Profile">
                        <img
                          src="/images/user.svg"
                          alt=""
                          style={{ width: "20px" }}
                        />
                        <span className="ms-3 fw-bold">Profile</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/Payment">
                        <img
                          src="/images/bill.svg"
                          alt=""
                          style={{ width: "20px" }}
                        />
                        <span className="ms-3 fw-bold">pay</span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logout} href="/">
                        {" "}
                        <img
                          src="/images/logout.svg"
                          alt=""
                          style={{ width: "20px" }}
                        />
                        <span className="ms-3 fw-bold">Logout</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
                </Nav>
              </>
            )
          ) : (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Nav>
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Series">TV Series</Nav.Link>
                    <Nav.Link href="/Movies">Movies</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Nav>
              <Navbar.Brand
                href="#home"
                className="d-flex justify-content-center"
              >
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
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
