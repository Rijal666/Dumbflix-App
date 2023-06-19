/** @format */

import React, { useState, useEffect } from "react";
import Navbars from "../components/Navbar";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { Button, Container, Form } from "react-bootstrap";

export default function AddEpisode() {
  const [imageUrl, setImageUrl] = useState("/images/placeholder.webp");
  const { id } = useParams();
  const navigate = useNavigate();

  const [formEpisode, setFormEpisode] = useState({
    id: 0,
    title: "",
    thumbnail: "",
    link: "",
    film_id: id,
  });
  console.log(formEpisode, "pepek");

  const handleChange = (e) => {
    setFormEpisode({
      ...formEpisode,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const submitAddEpisode = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        Headers: {
          "Content-type": "multipart/form-data",
        },
      };

      //store data width FormData as object
      const formData = new FormData();
      formData.set(
        "thumbnail",
        formEpisode.thumbnail[0],
        formEpisode.thumbnail[0].name
      );
      formData.set("title", formEpisode.title);
      formData.set("link", formEpisode.link);
      formData.set("film_id", Number(formEpisode.film_id));

      //insert trip data
      const response = await API.post("/episode", formData, config);
      console.log("add episode success : ", response);

      navigate("/ListFilms");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add episode Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Add episode Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("add episode failed : ", error);
    }
  });

  return (
    <>
      <Navbars />
      <Container>
        <div className="m-5">
          <h1 className="fw-bold">Add Episode</h1>
          <Form onSubmit={(e) => submitAddEpisode.mutate(e)}>
            <div className="d-flex mt-5 gap-5" style={{ height: "50px" }}>
              <Form.Control
                type="text"
                placeholder="title"
                name="title"
                value={formEpisode.title}
                onChange={handleChange}
                style={{
                  backgroundColor: "#4C4C4C",
                  color: "white",
                }}
              />
              <Form.Group
                className="mb-5 d-flex gap-5"
                style={{ width: "40%", height: "100%" }}
              >
                <Form.Label
                  style={{
                    border: "2px solid #B1B1B1",
                    width: "1000%",
                    height: "100%",
                    backgroundColor: "#4C4C4C",
                    color: "white",
                  }}
                  className="rounded"
                >
                  <div className="d-flex justify-content-between align-items-center py-2 px-3">
                    <div>
                      <p
                        style={{
                          fontSize: "20px",
                          marginBottom: "0",
                        }}
                      >
                        Attache Thumbnail
                      </p>
                    </div>
                    <div>
                      <Form.Control
                        multiple
                        type="file"
                        name="thumbnail"
                        id="thumbnail"
                        onChange={handleChange}
                        hidden
                      />
                      <img src="/images/clip.svg" alt="" />
                    </div>
                  </div>
                </Form.Label>
              </Form.Group>
              <img src={imageUrl} alt="preview" style={{ height: "100%" }} />
            </div>
            <Form.Control
              type="text"
              placeholder="link"
              name="link"
              className="my-3 text-light"
              value={formEpisode.link}
              onChange={handleChange}
              style={{
                backgroundColor: "#4C4C4C",
                padding: "12px 10px",
              }}
            />
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                className="bg-danger px-5"
                style={{ border: "none" }}
              >
                Add
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}
