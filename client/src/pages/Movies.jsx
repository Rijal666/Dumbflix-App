/** @format */

import React, { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Container, Card, NavLink } from "react-bootstrap";

import Navbars from "../components/Navbar";

export default function Movies() {
  const [movies, setMovies] = useState();
  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    // return response.data.data;
    const moviedata = response.data.data;
    const moviesOnly = moviedata.filter(
      (movie) => movie.category.name === "Movies"
    );
    setMovies(moviesOnly);
  });

  console.log(movies, "kontool");

  return (
    <>
      <Navbars />
      <Container>
        <h1 className="my-5 text-light">MOVIES</h1>
        <div className="d-flex">
          {movies?.map((film, i) => {
            return (
              <Card
                key={i}
                style={{
                  width: "15rem",
                  backgroundColor: "black",
                  marginRight: "20px",
                }}
              >
                <NavLink>
                  <Card.Img
                    variant="top"
                    src={film.thumbnail}
                    width="100px"
                    height="300px"
                  />
                  <Card.Body>
                    <Card.Title className="text-light fw-bold">
                      {film.title}
                    </Card.Title>
                    <Card.Text className="text-light">{film.year}</Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}
