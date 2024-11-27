import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Card, Text, Container, Flex, Center } from "@mantine/core";
import "./PrayerMarquee.css";

const PrayerMarquee = ({ prayerTimes }) => {
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
        return { name: prayerName, time: prayerTime }; // Return prayer name and time
      }
    }
    const fajrTime = filteredPrayerTimes["Fajr"];
    if (fajrTime) {
      const [hours, minutes] = fajrTime.split(":");
      const prayerTime = new Date();
      prayerTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
      prayerTime.setDate(prayerTime.getDate() + 1); // Assume Fajr is the next day if all others passed
      return { name: "Fajr", time: prayerTime };
    }
    return null;
  };

  const [nextPrayer, setNextPrayer] = useState(determineNextPrayer());
  const [timeRemaining, setTimeRemaining] = useState(
    nextPrayer ? calculateTimeRemaining(nextPrayer.time) : "Calculating..."
  );

  // Update the next prayer and the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedNextPrayer = determineNextPrayer();
      setNextPrayer(updatedNextPrayer);
      if (updatedNextPrayer) {
        setTimeRemaining(calculateTimeRemaining(updatedNextPrayer.time));
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <Container mt={50} mb={80}>
      <Flex direction={{ base: "column", sm: "column" }}>
        <Center mb={20}>
          <h3>
            Next, <span style={{ color: "#4ecca3" }}>{nextPrayer?.name}</span>, in{" "}
            <span style={{ color: "#4ecca3" }}>{timeRemaining}</span>
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
            >
              <Text weight="bold">{prayerName}</Text>
              <Text>{time}</Text>
            </Card>
          ))}
        </Marquee>
      </Flex>
    </Container>
  );
};

export default PrayerMarquee;
