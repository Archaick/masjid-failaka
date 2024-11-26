import React from "react";
import Marquee from "react-fast-marquee";
import { Card, Text, Container, Center, Flex } from "@mantine/core";

const PrayerMarquee = ({ prayerTimes }) => {
  const determineNextPrayer = () => {
    const currentTime = new Date();
    for (const [prayerName, time] of Object.entries(prayerTimes)) {
      const [hours, minutes] = time.split(":");
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
      <Flex direction={{ base: 'column', sm: 'column' }} >
        <h3>Next prayer</h3>
        <Marquee gradient={false}>
          {Object.entries(prayerTimes).map(([prayerName, time]) => (
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
