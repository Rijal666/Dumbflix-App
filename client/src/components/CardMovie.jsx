/** @format */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Container, Card, Row, Col, NavLink } from "react-bootstrap";

function CardMovie() {
  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  console.log(films, "kontool");

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Container>
      <Col style={{ marginTop: "100px" }} className="mb-5">
        <h1 className="text-light fw-bold">Movie</h1>
      </Col>
      <Carousel responsive={responsive}>
        {films?.map((film, i) => {
          return (
            <div>
              <Card
                key={i}
                style={{
                  width: "15rem",
                  backgroundColor: "black",
                  marginRight: "20px",
                }}
              >
                <NavLink href={`/Detail/${film?.id}`}>
                  <Card.Img variant="top" src={film?.thumbnail} />
                  <Card.Body>
                    <Card.Title className="text-light fw-bold">
                      {film?.title}
                    </Card.Title>
                    <Card.Text className="text-light">{film?.year}</Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
}

export default CardMovie;
