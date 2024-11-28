import React from "react";
import { Tabs, Box, Title, Text, Center } from "@mantine/core";
import "./History.css";
import {
  IconArrowUp,
  IconPhoto,
  IconTimeline,
  IconUser,
} from "@tabler/icons-react";

const History = () => {
  return (
    <Box className="history-container">
      {/* Header */}
      <Title order={2} className="history-title">
        Our History
      </Title>

      <Tabs
        color="#4ecca3"
        defaultValue="founder"
        orientation="vertical"
        className="history-tabs"
      >
        <Tabs.List>
          <Tabs.Tab value="founder">
            <IconUser />
            The Founder
          </Tabs.Tab>
          <Tabs.Tab value="milestones">
            <IconTimeline />
            Key Milestones
          </Tabs.Tab>
          <Tabs.Tab value="gallery">
            <IconPhoto />
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="future">
            <IconArrowUp />
            Looking Ahead
          </Tabs.Tab>
        </Tabs.List>

        {/* Tab Panels */}
        <Center>
          <Tabs.Panel value="founder">
            <Text className="tab-content">
              Founded in 2000 through a generous donation from Kuwaiti
              philanthropist Fatima Jasim, Masjid Failaka is a center for worship,
              learning, and community in Palemrah, Jakarta.
            </Text>
          </Tabs.Panel>
        </Center>

        <Center>
          <Tabs.Panel value="milestones">
            <Text className="tab-content">
              <ul>
                <li>
                  Hosts daily prayers, Quran study sessions, and religious
                  events.
                </li>
                <li>
                  Offers youth and educational programs for personal and
                  spiritual growth.
                </li>
                <li>
                  In 2020, celebrated two decades of serving the Palemrah
                  community.
                </li>
              </ul>
            </Text>
          </Tabs.Panel>
        </Center>

        <Center>
          <Tabs.Panel value="gallery">
            <Text className="tab-content">
              Explore photos and videos of events, daily prayers, and special
              moments that have brought the Palemrah community closer together.
            </Text>
          </Tabs.Panel>
        </Center>

        <Center>
          <Tabs.Panel value="future">
            <Text className="tab-content">
              Our future focus is on serving the Palemrah community by expanding
              youth programs, improving facilities, and nurturing unity and
              faith.
            </Text>
          </Tabs.Panel>
        </Center>
      </Tabs>
    </Box>
  );
};

export default History;
