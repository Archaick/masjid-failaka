import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import exterior from "../assets/gallery/exterior.png";
import lecture from "../assets/gallery/lecture.jpg";
import orphanage from "../assets/gallery/orphanage.png";
import activities from "../assets/gallery/activities.png";
import "./Gallery.css";

const images = [
  {
    title: "Masjid's Grounds",
    description: "A boundary between urban life and spiritual peace",
    src: exterior,
  },
  {
    title: "Vibrant Lessons",
    description: "Students engaged with an instructor in the masjid",
    src: lecture,
  },
  {
    title: "Orphanage Events",
    description: "A charity event organized for orphans",
    src: orphanage,
  },
  {
    title: "Children's Activities",
    description: "Fun and educational activities for children",
    src: activities,
  },
];

const Gallery = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Building Faith, Community, and Memories</h2>

      <Carousel
        // withIndicators
        height={400}
        slideSize="70%"
        slideGap="sm"
        controlsOffset="xl"
        controlSize={27}
        loop
        plugins={[autoplay.current]}
      >
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <div className="carousel-slide">
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="carousel-image"
              />

              {/* Overlay */}
              <div className="carousel-overlay">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
