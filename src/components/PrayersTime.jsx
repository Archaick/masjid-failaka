import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Container, Center } from "@mantine/core";
import "./PrayersTime.css";
import Marquee from "react-fast-marquee";

const PrayersTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [showContent, setShowContent] = useState(false); // New state to control delayed mount

  // Show the component content after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  // Get the current date in Jakarta timezone
  const getJakartaNow = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000; // Local timezone offset in ms
    const jakartaOffset = 7 * 60 * 60000; // Jakarta is UTC+7
    return new Date(now.getTime() + utcOffset + jakartaOffset);
  };

  const fetchPrayerTimes = async (date) => {
    try {
      const latitude = -6.2088; // Jakarta latitude
      const longitude = 106.8456; // Jakarta longitude
      const method = 20; // KEMENAG - Indonesia method

      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${date}`,
        { params: { latitude, longitude, method } }
      );

      const timings = response.data.data.timings;
      const filteredTimings = {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      };

      const formattedTimings = {};
      Object.entries(filteredTimings).forEach(([prayer, time]) => {
        formattedTimings[prayer] = convertToJakartaTime(time);
      });

      setPrayerTimes(formattedTimings);
      findNextPrayer(formattedTimings);
    } catch (err) {
      console.error("Error retrieving prayer times:", err);
    }
  };

  const convertToJakartaTime = (time) => {
    const [hour, minute] = time.split(":");
    const jakartaTime = getJakartaNow();
    jakartaTime.setHours(hour - 1, minute, 0, 0);
    return jakartaTime;
  };

  const findNextPrayer = (timings) => {
    const now = getJakartaNow();
    const next = Object.entries(timings).find(([_, time]) => time > now);
    if (next) {
      setNextPrayer({ name: next[0], time: next[1] });
    } else {
      // If no next prayer found, assume the next Fajr of the following day
      const tomorrowFajr = new Date(timings.Fajr);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      setNextPrayer({ name: "Fajr", time: tomorrowFajr });
    }
  };

  const calculateCountdown = () => {
    if (!nextPrayer) return;
    const now = getJakartaNow();
    const diff = nextPrayer.time - now;

    if (diff <= 0) {
      findNextPrayer(prayerTimes); // Re-evaluate if countdown reaches zero
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setCountdown(`${hours}h ${minutes}m`);
  };

  useEffect(() => {
    const today = getJakartaNow()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-"); // Format as DD-MM-YYYY
    fetchPrayerTimes(today);
  }, []);

  useEffect(() => {
    calculateCountdown(); // Initial countdown calculation
    const interval = setInterval(calculateCountdown, 60000); // Update countdown every minute
    return () => clearInterval(interval);
  }, [nextPrayer, prayerTimes]);

  // Render a loader if showContent is still false
  if (!showContent) {
    return (
      <Center style={{ height: '300px' }}>
        <Loader size="lg" type="bars" color="#4ecca3" />
      </Center>
    );
  }

  return (
    <Container className="marquee-container" mt={50}>
      {nextPrayer && (
        <h2>
          Next prayer "{nextPrayer.name}" in {countdown}
        </h2>
      )}
      <Container mt={50} mb={200}>
        {prayerTimes ? (
          <Marquee gradient={false} speed={80} className="marquee-list">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <span
                key={prayer}
                className={`prayer-item ${
                  nextPrayer && nextPrayer.name === prayer
                    ? "color-pulse-indicator"
                    : ""
                }`}
              >
                {prayer} <br />
                {time.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
            ))}
          </Marquee>
        ) : (
          <Loader size="lg" type="bars" color="#4ecca3" />
        )}
      </Container>
    </Container>
  );
};

export default PrayersTime;
