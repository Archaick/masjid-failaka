import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Container, Center } from "@mantine/core";
import "./PrayersTime.css";
import Marquee from "react-fast-marquee";

const PrayersTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [showContent, setShowContent] = useState(false);

  // Delay content rendering by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Get current time in Jakarta timezone
  const getJakartaNow = () => {
    return new Date(
      new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta" }).format(
        new Date()
      )
    );
  };

  // Fetch prayer times from the Aladhan API
  const fetchPrayerTimes = async (date) => {
    try {
      const params = {
        latitude: -6.2088,
        longitude: 106.8456,
        method: 20, // KEMENAG - Indonesia
        timezone: "Asia/Jakarta",
      };

      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${date}`,
        { params }
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
    } catch (error) {
      console.error("Error retrieving prayer times:", error);
    }
  };

  // Convert prayer times to Jakarta timezone
  const convertToJakartaTime = (time) => {
    const [hour, minute] = time.split(":");
    const jakartaDate = getJakartaNow();
    jakartaDate.setHours(hour, minute, 0, 0);
    return jakartaDate;
  };

  // Determine the next prayer
  const findNextPrayer = (timings) => {
    const now = getJakartaNow();
    const next = Object.entries(timings).find(([_, time]) => time > now);
    if (next) {
      setNextPrayer({ name: next[0], time: next[1] });
    } else {
      const tomorrowFajr = new Date(timings.Fajr);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      setNextPrayer({ name: "Fajr", time: tomorrowFajr });
    }
  };

  // Calculate countdown to the next prayer
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

  // Fetch prayer times on mount and update daily
  useEffect(() => {
    const today = getJakartaNow()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-"); // Format as DD-MM-YYYY
    fetchPrayerTimes(today);

    const interval = setInterval(() => {
      const newDate = getJakartaNow()
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");
      fetchPrayerTimes(newDate);
    }, 24 * 60 * 60 * 1000); // Update daily

    return () => clearInterval(interval);
  }, []);

  // Update countdown every minute
  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, [nextPrayer, prayerTimes]);

  // Render a loader while the content is delayed
  if (!showContent) {
    return (
      <Center style={{ height: "300px" }}>
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
          <Marquee
            gradient={false}
            speed={80}
            className="marquee-list"
            style={{
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflowX: "hidden",
            }}
          >
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <span
                key={prayer}
                className={`prayer-item ${
                  nextPrayer && nextPrayer.name === prayer
                    ? "color-pulse-indicator"
                    : ""
                }`}
                style={{ minWidth: "fit-content" }}
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
