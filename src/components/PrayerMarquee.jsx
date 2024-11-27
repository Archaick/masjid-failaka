import React from "react";
import Marquee from "react-fast-marquee";
import { Card, Text, Container, Flex, Center } from "@mantine/core";

const PrayerMarquee = ({ prayerTimes }) => {
  const filteredPrayerTimes = Object.fromEntries(
    Object.entries(prayerTimes).filter(([key]) =>
      ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(key)
    )
  );

  const determineNextPrayer = () => {
    const currentTime = new Date();
    // object.entries made prayerTimes into array-key values...
    for (const [prayerName, time] of Object.entries(filteredPrayerTimes)) {
      const [hours, minutes] = time.split(":");
      // filtering for 5 prayers only
      const prayerTime = new Date();
      prayerTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
      if (currentTime < prayerTime) {
        return prayerName; // Return the first prayer that is after the current time
      }
    }
    return "Fajr"; // Default to Fajr if all prayers for the day have passed
  };
  const nextPrayer = determineNextPrayer();

  return (
    <Container mt={50} mb={80}>
      <Flex direction={{ base: "column", sm: "column" }}>
        <Center mb={20}>
          <h3>Next Prayer '' in: </h3>
        </Center>
        <Marquee gradient={false}>
          {Object.entries(filteredPrayerTimes).map(([prayerName, time]) => (
            <Card
              key={prayerName}
              style={{
                backgroundColor: prayerName === nextPrayer ? "#4ecca3" : "#ccc",
                margin: "0 10px",
                padding: "10px",
                borderRadius: "8px",
                minWidth: "120px",
              }}
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
