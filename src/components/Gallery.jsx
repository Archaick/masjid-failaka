import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
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
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "700" }}>
        Building Faith, Community, and Memories
      </h2>

      <Carousel
        withIndicators
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
            <div style={{ position: "relative", height: "100%" }}>
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "rgba(255, 170, 0, 0.7)", // Softer yellow with less brightness
                  color: "white",
                  padding: "15px",
                  borderRadius: "0 0 8px 8px",
                  boxShadow: "0px 4px 8px rgba(255, 170, 0, 0.4)", // Softer yellow shadow
                }}
              >
                <h3 style={{ margin: "0 0 5px", fontSize: "1.2rem" }}>
                  {image.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>{image.description}</p>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
