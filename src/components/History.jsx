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
    <Box className="history-container" id="about">
      {/* Header */}
      <Title order={2} className="history-title">
        What do we do?
      </Title>

      <Tabs
        color="#fbbf10"
        defaultValue="founder"
        orientation="vertical"
        className="history-tabs"
      >
        <Tabs.List>
          <Tabs.Tab value="founder" className="history-tab">
            <span className="tab-text">Foundation</span>
          </Tabs.Tab>
          <Tabs.Tab value="milestones" className="history-tab">
            <span className="tab-text">Key Milestones</span>
          </Tabs.Tab>
          <Tabs.Tab value="gallery" className="history-tab">
            <span className="tab-text">Gallery</span>
          </Tabs.Tab>
          <Tabs.Tab value="future" className="history-tab">
            <span className="tab-text">Looking Ahead</span>
          </Tabs.Tab>
        </Tabs.List>

        {/* Tab Panels */}

        <Center>
          <Tabs.Panel value="founder" className="tabs-panel">
            <IconUser className="tabs-icon" />
            <Text className="tab-content">
              <ul>
                <li>
                  Founded in 2000 with a generous donation from Kuwaiti
                  philanthropist Fatima Jasim.
                </li>
                <li>
                  Serves as a hub for worship, education, and community
                  activities.
                </li>
                <li>
                  Located in Palemrah, Jakarta, fostering spiritual and social
                  growth.
                </li>
              </ul>
            </Text>
          </Tabs.Panel>
        </Center>

        <Center>
          <Tabs.Panel value="milestones" className="tabs-panel">
            <IconTimeline className="tabs-icon" />
            <Text className="tab-content">
              <ul>
                <li>Hosts daily prayers, Quran study sessions, and events.</li>
                <li>Offers youth and educational programs.</li>
                <li>
                  In 2020, celebrated two decades of serving the Palemrah
                  community.
                </li>
              </ul>
            </Text>
          </Tabs.Panel>
        </Center>

        <Center>
          <Tabs.Panel value="gallery" className="tabs-panel">
            <IconPhoto className="tabs-icon" />
            <Text className="tab-content">
              <ul>
                <li>
                  Explore a collection of photos and videos showcasing community
                  events.
                </li>
                <li>
                  Witness moments of daily prayers captured in vivid detail.
                </li>
                <li>
                  Relive special occasions that bring the community closer.
                </li>
              </ul>
            </Text>
          </Tabs.Panel>
        </Center>

        <Center>
          <Tabs.Panel value="future" className="tabs-panel">
            <IconArrowUp className="tabs-icon" />
            <Text className="tab-content">
              <ul>
                <li>
                  Expanding youth programs to empower the younger generation.
                </li>
                <li>
                  Work towards improving facilities to better serve the
                  community.
                </li>
                <li>
                  Prioritize nurturing unity and faith among members of the
                  community.
                </li>
              </ul>
            </Text>
          </Tabs.Panel>
        </Center>
      </Tabs>
    </Box>
  );
};

export default History;
