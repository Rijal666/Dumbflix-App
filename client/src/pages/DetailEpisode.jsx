/** @format */

// /** @format */

import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import Navbars from "../components/Navbar";
// // import { useState } from "react";
import { Container, Carousel } from "react-bootstrap";
// import Eps1 from "../assets/image/Witcher.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper";
// import { useEffect } from "react";
// // import Swal from "sweetalert2";

export default function DetailsEpisode(props) {
  const { IsLogin, user } = props;
  const { id } = useParams();

  // Fetching product data from database
  let { data: episodes } = useQuery("episodeCache", async () => {
    const response = await API.get(`/episode/${id}`);
    return response.data.data;
  });
  console.log(episodes, "ininnnninii");
  let { data: filmid } = useQuery("filmCache", async () => {
    const response = await API.get(`/film/${episodes?.film?.id}`);
    return response.data.data;
  });
  console.log(filmid, "ininnnsdadasdninii");

  return (
    <>
      <Navbars />
      <div>
        <div>
          <iframe
            width="100%"
            height="520"
            src={`https://youtube.com/embed/${episodes?.link}`}
            alt="Video"
            allowFullScreen
          />
        </div>
        <Container>
          <div className="mt-4 d-flex justify-content-between">
            <div className="d-flex gap-5">
              <div className="mb-3">
                <img
                  className="rounded"
                  src={episodes?.film?.thumbnail}
                  width="200px"
                  height="300px"
                  style={{ objectFit: "cover" }}
                  alt="Card"
                />
              </div>
              <div className="col-md-5">
                <h2 className="fw-bold text-light mt-4">
                  {episodes?.film?.title}
                </h2>
                <div className="d-flex gap-4">
                  <p className="text-secondary fw-lighter ">
                    {episodes?.film?.year}
                  </p>
                  <p className="text-secondary fw-lighter border rounded pe-3 ps-3">
                    {episodes?.film?.category?.name}
                  </p>
                </div>
                <p className="text-light" style={{ textAlign: "justify" }}>
                  {episodes?.film?.description}
                </p>
              </div>
            </div>
            <div style={{ width: "35%" }}>
              <Carousel slide={false}>
                {filmid?.episode?.map((films, i) => {
                  return (
                    <Carousel.Item>
                      <div style={{ height: "250px" }}>
                        <Link to={`/Detailepisode/${films?.id}`}>
                          <img
                            className="d-block w-100"
                            src={films?.thumbnail}
                            alt=""
                            height="100%"
                          />
                        </Link>
                      </div>
                      <p>{films?.title}</p>
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
