/** @format */

import React from "react";
import Carousel from "../components/Carousel";
import CardMovie from "../components/CardMovie";
import CardTV from "../components/CardTV";
import Navbars from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbars />
      <Carousel />
      <CardTV />
      <CardMovie />
    </>
  );
}
