/** @format */

import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbar";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function Payment() {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        seller_id: state.user.id,
        price: e.price,
      };

      const body = JSON.stringify(data);

      const response = await API.post("/transaction", body, config);
      console.log("transaction success :", response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/Profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/Profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/Profile");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  });

  return (
    <>
      <Navbars />
      <Container>
        <h1>payment</h1>
        <div className="p-5 bg-dark m-5 rounded">
          <p className="fs-3 fw-bold text-light text-center">
            Update ke Premium sekarang
          </p>
          <div className="d-flex justify-content-center mt-5">
            <Button
              onClick={() => handleBuy.mutate({ price: 50.0 })}
              className="bg-danger"
            >
              Rp.50.000
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
