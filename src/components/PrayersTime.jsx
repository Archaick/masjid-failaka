import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Container, Center, Text } from "@mantine/core";
import "./PrayersTime.css";
import PrayerMarquee from "./PrayerMarquee";

const PrayersTime = () => {
  const [dates, setDates] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null)


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

      const timings = response.data.data.timings
      const hijriMonth = response.data.data.date.gregorian.month
      setPrayerTimes(timings)

      // console response
      // console.log(response.data.data.date.hijri.month)

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
      {prayerTimes && <PrayerMarquee prayerTimes={prayerTimes} />}
    </Container>
  );
};

export default PrayersTime;
