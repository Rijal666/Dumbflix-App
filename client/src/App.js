/** @format */

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import TVShow from "./pages/TVShow";
import AddFilm from "./pages/AddFilm";
import { UserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import { setAuthToken, API } from "./config/api";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        Navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return;
    }
  };
  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <img
            src="/images/xnxx.png"
            alt="Dewetour"
            className="animate__heartBeat"
          />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Series" element={<TVShow />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Addfilm" element={<AddFilm />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      )}
    </>
  );
}

export default App;
