/** @format */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Card, Row, Col, NavLink } from "react-bootstrap";

function CardTV() {
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
        <h1 className="text-light fw-bold">TV Series</h1>
      </Col>
      <Carousel responsive={responsive}>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
              marginRight: "20px",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: "15rem",
              backgroundColor: "black",
            }}
          >
            <NavLink>
              <Card.Img variant="top" src="/images/card1.svg" />
              <Card.Body>
                <Card.Title className="text-light fw-bold">
                  The Whitcer
                </Card.Title>
                <Card.Text className="text-light">2019</Card.Text>
              </Card.Body>
            </NavLink>
          </Card>
        </div>
      </Carousel>
      ;
    </Container>
  );
}

export default CardTV;
