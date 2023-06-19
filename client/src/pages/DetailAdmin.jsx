/** @format */

// /** @format */

import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import Navbars from "../components/Navbar";
// // import { useState } from "react";
import { Container, Carousel, Button } from "react-bootstrap";
// import Eps1 from "../assets/image/Witcher.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper";
// import { useEffect } from "react";
// // import Swal from "sweetalert2";

export default function DetailsAdmin(props) {
  const { IsLogin, user } = props;
  const { id } = useParams();
  console.log(id, "ini pepek");

  // Fetching product data from database
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });
  console.log(films, "ininnnninii");

  return (
    <>
      <Navbars />
      <div>
        <div>
          <iframe
            width="100%"
            height="520"
            src={`//youtube.com/embed/${films?.link_episode}`}
            alt="Video"
            allowFullScreen
          />
        </div>
        <div className="d-flex justify-content-end mx-5 my-4">
          <Button
            className="bg-danger"
            style={{ border: "none" }}
            href={`/Addepisode/${id}`}
          >
            Add Episode
          </Button>
        </div>
        <Container>
          <div className="mt-4 d-flex justify-content-between">
            <div className="d-flex gap-5">
              <div className="mb-3">
                <img
                  className="rounded"
                  src={films?.thumbnail}
                  width="200px"
                  height="300px"
                  style={{ objectFit: "cover" }}
                  alt="Card"
                />
              </div>
              <div className="col-md-5">
                <h2 className="fw-bold text-light mt-4">{films?.title}</h2>
                <div className="d-flex gap-4">
                  <p className="text-secondary fw-lighter ">{films?.year}</p>
                  <p className="text-secondary fw-lighter border rounded pe-3 ps-3">
                    TV Series
                  </p>
                </div>
                <p className="text-light" style={{ textAlign: "justify" }}>
                  {films?.description}
                </p>
              </div>
            </div>
            <div style={{ width: "35%" }}>
              <Carousel slide={false}>
                {films?.episode.map((film, i) => {
                  return (
                    <Carousel.Item>
                      <div style={{ height: "250px" }}>
                        <Link to={`/Detailepisode/${film?.id}`}>
                          <img
                            className="d-block w-100"
                            src={film?.thumbnail}
                            alt=""
                            height="100%"
                          />
                        </Link>
                      </div>
                      <p>{film?.title}</p>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
