import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Container } from "@mantine/core";
import "./PrayersTime.css";
import Marquee from "react-fast-marquee";

const PrayersTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");

  const fetchPrayerTimes = async (date) => {
    try {
      const latitude = -6.2088; // Latitude for Jakarta
      const longitude = 106.8456; // Longitude for Jakarta
      const method = 20; // KEMENAG - Kementerian Agama Republik Indonesia

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
        formattedTimings[prayer] = formatTo24HourTime(time);
      });

      setPrayerTimes(formattedTimings);
      findNextPrayer(formattedTimings);
      calculateCountdown(); // Initial countdown calculation
    } catch (err) {
      console.error("Error retrieving prayer times:", err);
    }
  };

  const formatTo24HourTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date;
  };

  const findNextPrayer = (timings) => {
    const now = new Date();
    const next = Object.entries(timings).find(([prayer, time]) => time > now);
    if (next) {
      setNextPrayer({ name: next[0], time: next[1] });
    } else {
      // If the current time is past Isha, set the next prayer as Fajr on the next day
      const tomorrowFajr = new Date();
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      tomorrowFajr.setHours(...timings.Fajr.split(":"));
      setNextPrayer({ name: "Fajr", time: tomorrowFajr });
    }
  };

  const calculateCountdown = () => {
    if (!nextPrayer) return;
    const now = new Date();
    const diff = nextPrayer.time - now;

    if (diff <= 0) {
      // If the countdown reaches zero or becomes negative, find the next prayer
      findNextPrayer(prayerTimes);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setCountdown(`${hours}h ${minutes}m`);
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-"); // Format date as DD-MM-YYYY
    fetchPrayerTimes(today);
  }, []);

  useEffect(() => {
    calculateCountdown(); // Calculate immediately upon mounting
    const interval = setInterval(calculateCountdown, 60000); // Update countdown every minute
    return () => clearInterval(interval);
  }, [nextPrayer, prayerTimes]);

  return (
    <Container className="marquee-container" mt={50}>
      {nextPrayer && (
        <h2>
          Next prayer "{nextPrayer.name}" in {countdown}
        </h2>
      )}
      <Container mt={50} mb={200}>
        {prayerTimes ? (
          <Marquee gradient={false} speed={50}>
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <span
                key={prayer}
                className={`prayer-item ${
                  nextPrayer && nextPrayer.name === prayer
                    ? "color-pulse-indicator"
                    : ""
                }`}
              >
                {prayer}:{" "}
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
