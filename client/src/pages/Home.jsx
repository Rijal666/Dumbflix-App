/** @format */

import React from "react";
import Carousel from "../components/Carousel";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Container, Card, Row, Col, NavLink } from "react-bootstrap";
import Navbars from "../components/Navbar";

export default function Home() {
  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  console.log(films, "kontool");

  let asceding = [];
  if (films !== undefined) {
    asceding = [...films];
    asceding.sort((a, b) => b.id - a.id);
  }

  return (
    <>
      <Navbars />
      <Carousel />
      <Container>
        <Col style={{ margin: "200px 0" }} className="mb-5">
          <h1 className="text-light fw-bold">Film Terbaru</h1>
        </Col>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "50px",
            gap: "25px",
          }}
        >
          {asceding?.map((film, i) => {
            return (
              <Card
                key={i}
                style={{
                  width: "15rem",
                  backgroundColor: "black",
                  marginRight: "20px",
                }}
              >
                <NavLink href={`/Detail/${film?.id}`}>
                  <Card.Img
                    variant="top"
                    src={film?.thumbnail}
                    width="100px"
                    height="300px"
                    style={{ objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-light fw-bold">
                      {film?.title}
                    </Card.Title>
                    <Card.Text className="text-light">{film?.year}</Card.Text>
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
