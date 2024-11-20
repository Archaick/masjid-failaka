import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Gallery.css";
import exterior from "../assets/gallery/exterior.png";
import lecture from "../assets/gallery/lecture.jpg";
import orphanage from "../assets/gallery/orphanage.png";
import activities from "../assets/gallery/activities.png";

const images = [
  {
    title: "Outskirts of our masjid",
    description: "A boundary between urban life and spiritual peace",
    src: exterior,
  },
  {
    title: "Instructor with Students",
    description: "An instructor giving a lecture to students in the masjid",
    src: lecture,
  },
  {
    title: "Orphanage Event",
    description: "A charity event organized for orphans",
    src: orphanage,
  },
  {
    title: "Children's Event",
    description: "A fun and educational event for children",
    src: activities,
  },
];

const Gallery = () => {
  return (
    <Container>
      <h2 className="gallery-title">Building Faith, Community, and Memories</h2>

      <Row className="g-4">
        {images.map((image, index) => (
          <Col lg={6} xs={12} key={index}>
            <div className="grid-item">
              <div className="image-container">
                <img
                  src={image.src}
                  alt={image.title}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <div className="overlay-title">{image.title}</div>
                  <div className="overlay-description">{image.description}</div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
