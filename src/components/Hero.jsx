import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import FirstSlide from "../assets/imgs/FirstSlide.jpg";
import SecondSlide from "../assets/imgs/SecondSlide.jpg";
import ThirdSlide from "../assets/imgs/ThirdSlide.jpg";
import './Hero.css'; // Import the custom CSS file

const Hero = () => {
  return (
    <div className="hero-container">
      <Carousel fade interval={5000} controls={false} pause={false}>
        <Carousel.Item>
          <img className="d-block w-100" src={FirstSlide} alt="First Slide" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={SecondSlide} alt="Second Slide" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={ThirdSlide} alt="Third Slide" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
