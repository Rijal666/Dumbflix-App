/** @format */

import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

export const Register = (props) => {
  const title = "Home";
  document.title = "Dumbflix | " + title;

  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { fullname, email, password, gender, phone, address } = formRegister;

  const OnChangeHandler = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", formRegister);

      console.log("register success : ", response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormRegister({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("register failed : ", error);
    }
    props.onHide();
  });

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="px-5 pb-3 bg-dark">
          <p className="fs-3 fw-bold text-light" style={{ paddingTop: 50 }}>
            Register
          </p>
          <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold text-light">Email</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                style={{ backgroundColor: "#4C4C4C" }}
                onChange={OnChangeHandler}
                name="email"
                value={email}
                type="email"
              />
              <Form.Label className="fw-bold text-light">Password</Form.Label>

              <Form.Control
                className="p-2 mb-3"
                style={{ backgroundColor: "#4C4C4C" }}
                type="password"
                onChange={OnChangeHandler}
                name="password"
                value={password}
              />
              <Form.Label className="fw-bold text-light">Full Name</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                style={{ backgroundColor: "#4C4C4C" }}
                onChange={OnChangeHandler}
                name="fullname"
                value={fullname}
                type="text"
              />
              <Form.Label className="fw-bold text-light">Gender</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                style={{ backgroundColor: "#4C4C4C" }}
                onChange={OnChangeHandler}
                name="gender"
                value={gender}
                type="text"
              />
              <Form.Label className="fw-bold text-light">Phone</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                style={{ backgroundColor: "#4C4C4C" }}
                onChange={OnChangeHandler}
                name="phone"
                value={phone}
                type="number"
              />
              <Form.Label className="fw-bold text-light">Address</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                onChange={OnChangeHandler}
                name="address"
                value={address}
                style={{
                  backgroundColor: "#4C4C4C",
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="fw-bold border-0 w-100 py-2 mt-3"
              style={{ backgroundColor: "white", color: "red" }}
            >
              Register
            </Button>
          </Form>

          <p className="text-center mt-3 text-light">
            Already have an account ? Klik{" "}
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

export default Register;
