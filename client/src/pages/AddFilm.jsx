/** @format */

import React, { useState, useEffect } from "react";
import Navbars from "../components/Navbar";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { Container, Form, Button } from "react-bootstrap";

export default function AddFilm() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("/images/placeholder.webp");
  const [categories, setCategories] = useState([]);

  const [formAddFilm, setFormAddFilm] = useState({
    id: 0,
    title: "",
    thumbnail: "",
    year: "",
    category_id: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormAddFilm({
      ...formAddFilm,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const submitAddTrip = useMutation(async (e) => {
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
        formAddFilm.thumbnail[0],
        formAddFilm.thumbnail[0].name
      );
      formData.set("title", formAddFilm.title);
      formData.set("category_id", Number(formAddFilm.category_id));
      formData.set("year", formAddFilm.year);
      formData.set("description", formAddFilm.description);
      formData.set("link_episode", formAddFilm.link);

      //insert trip data
      const response = await API.post("/film", formData, config);
      console.log("add film success : ", response);

      navigate("/ListFilms");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Film Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Add Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("add Film failed : ", error);
    }
  });

  const getCategory = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Navbars />
      <Container>
        <div className="m-5">
          <h1>Add Film</h1>
          <div className="my-5">
            <Form onSubmit={(e) => submitAddTrip.mutate(e)}>
              <div className="d-flex gap-5" style={{ height: "50px" }}>
                <Form.Control
                  type="text"
                  placeholder="title"
                  name="title"
                  value={formAddFilm.title}
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
                placeholder="Year"
                name="year"
                className="my-3 text-light"
                value={formAddFilm.year}
                onChange={handleChange}
                style={{
                  backgroundColor: "#4C4C4C",
                  padding: "12px 10px",
                }}
              />
              <div className="d-flex gap-5" style={{ height: "50px" }}>
                <Form.Select
                  style={{
                    border: "2px solid #B1B1B1",
                    backgroundColor: "#4C4C4C",
                    height: "100%",
                  }}
                  onChange={handleChange}
                  name="category_id"
                >
                  <option>Select Country</option>
                  {categories.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    width: "15%",
                  }}
                >
                  Add Category
                </Button>
              </div>
              <Form.Control
                className="my-3 text-light"
                placeholder="Description"
                as="textarea"
                name="description"
                value={formAddFilm.description}
                onChange={handleChange}
                style={{
                  height: "130px",
                  border: "2px solid #B1B1B1",
                  backgroundColor: "#4C4C4C",
                  resize: "none",
                }}
              />
              <Form.Control
                type="text"
                placeholder="Link"
                name="link"
                className="my-3 text-light"
                value={formAddFilm.link}
                onChange={handleChange}
                style={{
                  backgroundColor: "#4C4C4C",
                  padding: "12px 10px",
                }}
              />

              <div className="justify-content-end d-flex">
                <Button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    padding: "5px 70px",
                    fontWeight: "bold",
                  }}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
}
