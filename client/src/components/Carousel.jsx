/** @format */

import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function IndividualIntervalsExample() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="/images/carousel1.svg"
            alt="First slide"
          />
          <Carousel.Caption>
            <img src="/images/text1.svg" alt="" />
            <h5>
              Geralt of Rivia, a solitary monster hunter, struggles to find his
              place in a world where people often prove more wicked than beast
            </h5>
            <div className="d-flex gap-5 justify-content-center">
              <p>2019</p>
              <p style={{ border: "solid whhite" }}>TV Series</p>
            </div>
            <Button style={{ backgroundColor: "red", border: "none" }}>
              WATCH NOW!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="/images/carousel2.svg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <img src="/images/text2.svg" alt="" />

            <h5>
              Money Heist is a crime drama on Netflix - originally called La
              Casa de Papel. Money Heist season 3 has just been released by the
              streaming service. The plot reads: "Eight thieves take hostages
              and lock themselves in the Royal Mint of Spain as a criminal
              mastermind manipulates the police to carry out his plan."
            </h5>
            <div className="d-flex gap-5 justify-content-center">
              <p>2017</p>
              <p style={{ border: "solid whhite" }}>TV Series</p>
            </div>
            <Button style={{ backgroundColor: "red", border: "none" }}>
              WATCH NOW!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousel3.svg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <img src="/images/text3.svg" alt="" />
            <h5>
              In Gotham City, mentally troubled comedian Arthur Fleck is
              disregarded and mistreated by society. He then embarks on a
              downward spiral of revolution and bloody crime. This path brings
              him face-to-face with his alter-ego: the Joker.
            </h5>
            <div className="d-flex gap-5 justify-content-center">
              <p>2019</p>
              <p style={{ border: "solid whhite" }}>Movies</p>
            </div>
            <Button style={{ backgroundColor: "red", border: "none" }}>
              WATCH NOW!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default IndividualIntervalsExample;
