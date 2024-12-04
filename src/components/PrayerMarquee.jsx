import React, { useState, useEffect } from "react";
// https://www.npmjs.com/package/react-fast-marquee
import Marquee from "react-fast-marquee";
import { Card, Text, Container, Flex, Center } from "@mantine/core";
import {
  IconSunrise,
  IconSun,
  IconSunset,
  IconMoonStars,
  IconMoon,
} from "@tabler/icons-react";
import "./PrayerMarquee.css";

const PrayerMarquee = ({ prayerTimes }) => {
  const prayerIcons = {
    Fajr: <IconSunrise size={40} />,
    Dhuhr: <IconSun size={40} />,
    Asr: <IconSunset size={40} />,
    Maghrib: <IconMoonStars size={40} />,
    Isha: <IconMoon size={40} />,
  };

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
    <Container className="marquee-container" mt={30} mb={30}>
      <Flex direction="column">
        <Center>
          <h3>
            <span className="next-prayer-name">{nextPrayer?.name}</span>
            <span> in </span>
            <span className="time-remaining">{timeRemaining}</span>
          </h3>
        </Center>
        <Marquee gradient={true} speed={80} >
          {Object.entries(filteredPrayerTimes).map(([prayerName, time]) => (
            <Card
              key={prayerName}
              className={`prayer-card ${
                prayerName === nextPrayer?.name ? "active-prayer" : ""
              }`}
            >
              <Center>
                <div className="icon">{prayerIcons[prayerName]}</div>
              </Center>
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
