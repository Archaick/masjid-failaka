import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Card, Text, Container, Flex, Center } from "@mantine/core";
import "./PrayerMarquee.css";

// Placeholder imports for background images
import FajrImage from "../assets/prayers/fajr.jpg";
import DhuhrImage from "../assets/prayers/dhuhr.jpg";
import AsrImage from "../assets/prayers/asr.jpg";
import MaghribImage from "../assets/prayers/maghrib.jpg";
import IshaImage from "../assets/prayers/isha.jpg";

const PrayerMarquee = ({ prayerTimes }) => {
  // Mapping prayers to their specific background images
  const prayerImages = {
    Fajr: FajrImage,
    Dhuhr: DhuhrImage,
    Asr: AsrImage,
    Maghrib: MaghribImage,
    Isha: IshaImage,
  };

  // Filtering for 5 prayers only
  const filteredPrayerTimes = Object.fromEntries(
    Object.entries(prayerTimes).filter(([key]) =>
      ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(key)
    )
  );

  const calculateTimeRemaining = (prayerTime) => {
    const currentTime = new Date();
    const diff = prayerTime - currentTime;
    if (diff <= 0) return "0h 0m";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const determineNextPrayer = () => {
    const currentTime = new Date();
    for (const [prayerName, time] of Object.entries(filteredPrayerTimes)) {
      const [hours, minutes] = time.split(":");
      const prayerTime = new Date();
      prayerTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
      if (currentTime < prayerTime) {
        return { name: prayerName, time: prayerTime };
      }
    }
    const fajrTime = filteredPrayerTimes["Fajr"];
    if (fajrTime) {
      const [hours, minutes] = fajrTime.split(":");
      const prayerTime = new Date();
      prayerTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
      prayerTime.setDate(prayerTime.getDate() + 1);
      return { name: "Fajr", time: prayerTime };
    }
    return null;
  };

  const [nextPrayer, setNextPrayer] = useState(determineNextPrayer());
  const [timeRemaining, setTimeRemaining] = useState(
    nextPrayer ? calculateTimeRemaining(nextPrayer.time) : "Calculating..."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedNextPrayer = determineNextPrayer();
      setNextPrayer(updatedNextPrayer);
      if (updatedNextPrayer) {
        setTimeRemaining(calculateTimeRemaining(updatedNextPrayer.time));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container mt={50} mb={80}>
      <Flex direction={{ base: "column", sm: "column" }}>
        <Center mb={20}>
          <h3>
            <span style={{ color: "#393e46", fontWeight: "700" }}>
              {nextPrayer?.name}
            </span>
            <span> in </span>
            <span style={{ color: "#393e46", fontWeight: "700" }}>
              {timeRemaining}
            </span>
          </h3>
        </Center>
        <Marquee gradient={true} gradientWidth={50}>
          {Object.entries(filteredPrayerTimes).map(([prayerName, time]) => (
            <Card
              key={prayerName}
              className={`prayer-card ${
                prayerName === nextPrayer?.name
                  ? "active-prayer"
                  : "inactive-prayer"
              }`}
              style={{
                backgroundImage: `url(${prayerImages[prayerName]})`,
              }}
            >
              <div className="text-container">
                <Text className="prayer-name">{prayerName}</Text>
                <Text className="prayer-time">{time}</Text>
              </div>
            </Card>
          ))}
        </Marquee>
      </Flex>
    </Container>
  );
};

export default PrayerMarquee;
