import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Container, Center, Text } from "@mantine/core";
import "./PrayersTime.css";
import Marquee from "react-fast-marquee";

const PrayersTime = () => {
  const [dates, setDates] = useState(null);

  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get(
        "https://api.aladhan.com/v1/timingsByCity",
        {
          params: {
            city: "Jakarta",
            country: "Indonesia",
            method: 20, // KEMENAG - Kementerian Agama Republik Indonesia
          },
        }
      );

      const { gregorian, hijri } = response.data.data.date;
      setDates({ gregorian: gregorian.date, hijri: hijri.date });

      console.log("API Response:", response.data);
      console.log("Date response:", response.data.data.date.gregorian.date);
      console.log("Date response:", response.data.data.date.hijri.date);

      // setPrayerTimes(response.data.data.timings);
    } catch (error) {
      console.log("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  return (
    <Container mt={50} mb={50} size="xs">
      <Center>
        <h2>Prayers Time in Jakarta</h2>
      </Center>

      {dates ? (
        <Center>
          <Text size="lg">
            <span style={{ marginRight: "10px" }}>☀️</span>
            {dates.gregorian}
            <span style={{ margin: "0 10px" }}>🌙</span>
            {dates.hijri}
          </Text>
        </Center>
      ) : (
        <Center>
          <Loader color="blue" size="xl" type="bars" />
        </Center>
      )}
    </Container>
  );
};

export default PrayersTime;
