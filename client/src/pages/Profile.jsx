/** @format */

import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import ModalProfile from "../components/ModalProfile";
import { Container, Button } from "react-bootstrap";
import Navbars from "../components/Navbar";
import imgProfile from "../assets/image/myProfile.png";

export default function Profile() {
  const [state] = useContext(UserContext);
  console.log(state.user, "nskdkjandnan");
  const [showProfile, setShowProfile] = useState(false);

  const handleClose = () => {
    setShowProfile(false);
  };

  const handleShowProfile = () => {
    handleClose(true);
    setShowProfile(true);
  };
  return (
    <>
      <Navbars />
      <ModalProfile show={showProfile} onHide={handleClose} />
      <Container>
        <div
          className=" bg-dark d-flex justify-content-between"
          style={{
            margin: "50px 100px",
            padding: "10px 50px",
            borderRadius: "10px",
          }}
        >
          <div>
            <h1 className="mb-4">Personal Info</h1>
            <div className="d-flex gap-3">
              <div style={{ width: "60px" }}>
                <img
                  src="/images/vector.svg"
                  alt=""
                  width="100%"
                  className="align-self-start"
                />
              </div>
              <div>
                <h4>{state.user.fullname}</h4>
                <p style={{ color: "#8A8C90" }}>Full Name</p>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div style={{ width: "60px" }}>
                <img
                  src="/images/mail.svg"
                  alt=""
                  width="100%"
                  className="align-self-center"
                />
              </div>
              <div>
                <h4>{state.user.email}</h4>
                <p style={{ color: "#8A8C90" }}>Email</p>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div style={{ width: "60px" }}>
                <img
                  src="/images/ticket.svg"
                  alt=""
                  width="100%"
                  className="align-self-center"
                />
              </div>
              <div>
                <h4>{state.user.status}</h4>
                <p style={{ color: "#8A8C90" }}>Status</p>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div style={{ width: "60px" }}>
                <img
                  src="/images/gender.svg"
                  alt=""
                  width="100%"
                  className="align-self-center"
                />
              </div>
              <div>
                <h4>{state.user.gender}</h4>
                <p style={{ color: "#8A8C90" }}>Gender</p>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div style={{ width: "60px" }}>
                <img
                  src="/images/phone.svg"
                  alt=""
                  width="100%"
                  className="align-self-center"
                />
              </div>
              <div>
                <h4>{state.user.phone}</h4>
                <p style={{ color: "#8A8C90" }}>Mobile Phone</p>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div style={{ width: "60px" }}>
                <img
                  src="/images/maps.svg"
                  alt=""
                  width="90%"
                  className="align-self-center"
                />
              </div>
              <div>
                <h4>{state.user.address}</h4>
                <p style={{ color: "#8A8C90" }}>Address</p>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                marginTop: "50px",
                width: "305px",
                height: "370px",
              }}
            >
              <img
                src={state.user.thumbnail ? state.user.thumbnail : imgProfile}
                alt=""
                width="100%"
              />
            </div>
            <Button
              onClick={handleShowProfile}
              className="mt-4 fw-bold"
              style={{
                padding: "10px 98px",
                backgroundColor: "red",
                border: "none",
              }}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
