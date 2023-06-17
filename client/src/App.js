/** @format */

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import TVShow from "./pages/TVShow";
import ListTrans from "./pages/ListTrans";
import ListFilm from "./pages/ListFilm";
import Payment from "./pages/Payment";
import AddFilm from "./pages/AddFilm";
import DetailsEpisode from "./pages/DetailEpisode";
import AddEpisode from "./pages/AddEpisode";
import Details from "./pages/Detail";
import { UserContext } from "./context/userContext";
import DetailsAdmin from "./pages/DetailAdmin";
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
            src="/images/icon.svg"
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
          <Route path="/Payment" element={<Payment />} />
          <Route path="/ListTrans" element={<ListTrans />} />
          <Route path="/ListFilms" element={<ListFilm />} />
          <Route path="/Detail/:id" element={<Details />} />
          <Route path="/Detailadmin/:id" element={<DetailsAdmin />} />
          <Route path="/Detailepisode/:id" element={<DetailsEpisode />} />
          <Route path="/Addepisode/:id" element={<AddEpisode />} />
        </Routes>
      )}
    </>
  );
}

export default App;
