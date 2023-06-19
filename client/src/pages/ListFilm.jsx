/** @format */

import React from "react";
import {
  Container,
  DropdownButton,
  Dropdown,
  Button,
  Card,
  NavLink,
} from "react-bootstrap";
import Navbars from "../components/Navbar";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function ListFilm() {
  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  console.log(films, "kontool");
  return (
    <>
      <Navbars />
      <Container>
        <div className="m-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-5">
              <h1 className="fw-bold">List Film</h1>
              <DropdownButton
                id="dropdown-basic-button"
                title="Category"
                className="align-self-center"
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </div>
            <Button
              href="/Addfilm"
              className="align-self-center"
              style={{
                backgroundColor: "red",
                height: "20%",
                width: "15%",
                border: "none",
              }}
            >
              Add Film
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "50px 0",
              gap: "25px",
            }}
          >
            {films?.map((film, i) => {
              return (
                <Card
                  key={i}
                  style={{
                    width: "15rem",
                    backgroundColor: "black",
                    marginRight: "20px",
                  }}
                >
                  <NavLink href={`/Detailadmin/${film?.id}`}>
                    <Card.Img
                      variant="top"
                      src={film?.thumbnail}
                      width="100px"
                      height="300px"
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
        </div>
      </Container>
    </>
  );
}
