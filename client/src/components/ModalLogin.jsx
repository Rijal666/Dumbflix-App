/** @format */
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";

export const Login = (props) => {
  const title = "Home";
  document.title = "Dumbflix | " + title;

  const [_, dispatch] = useContext(UserContext);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formLogin;
  const navigate = useNavigate();

  const OnChangeHandler = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", formLogin);
      console.log("login success : ", response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);

      if (response.data.data.is_admin === true) {
        navigate("/ListTrans");
      } else {
        navigate("/");
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("login failed : ", error);
    }
    props.onHide();
  });

  // const handleLogin = () => {
  //   let users = JSON.parse(localStorage.getItem("users"));
  //   let user = users.find(
  //     (user) => user.email === data.email && user.password === data.password
  //   );
  //   if (!user) {
  //     alert("user not found");
  //   } else {
  //     localStorage.setItem("loginUsers", JSON.stringify(user));
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Login success",
  //       showConfirmButton: true,
  //     });
  //     if (user.email === "admin@gmail.com") {
  //       navigate("/Income");
  //     } else {
  //       window.location.reload();
  //     }
  //   }
  // };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="px-5 pb-3 bg-dark ">
          <p className="fs-3 fw-bold text-light" style={{ paddingTop: 50 }}>
            Login
          </p>
          <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold text-light">Email</Form.Label>
              <Form.Control
                className="p-2 mb-3 text-light"
                style={{ backgroundColor: "#4C4C4C" }}
                onChange={OnChangeHandler}
                name="email"
                value={email}
                type="email"
              />
              <Form.Label className="fw-bold text-light">Password</Form.Label>

              <Form.Control
                type="password"
                className="p-2 mb-3 text-light"
                style={{ backgroundColor: "#4C4C4C" }}
                onChange={OnChangeHandler}
                name="password"
                value={password}
              />
            </Form.Group>
            <Button
              type="submit"
              className="fw-bold border-0 w-100 py-2 mt-3"
              style={{ backgroundColor: "#E50914" }}
            >
              Login
            </Button>
          </Form>

          <p className="text-center mt-3 text-light">
            Don't have an account ? Klik{" "}
            <span
              onClick={props.onClick}
              className="fw-bold"
              style={{ cursor: "pointer" }}
            >
              Here
            </span>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Login;
