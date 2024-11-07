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
            <h3>Investing in the Next Generation</h3>
            <p>Support our efforts to nurture young minds in faith and knowledge</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={SecondSlide} alt="Second Slide" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h3>Guidance for Our Community</h3>
            <p>Your donations help us continue to be a center for spiritual growth and wisdom</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={ThirdSlide} alt="Third Slide" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h3>A Legacy of Giving</h3>
            <p>Contribute to the future of our mosque and community</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
