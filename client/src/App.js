/** @format */

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import TVShow from "./pages/TVShow";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Series" element={<TVShow />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
