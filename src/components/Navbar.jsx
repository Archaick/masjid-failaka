import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useMediaQuery } from "@mantine/hooks";
import { Burger, Group, Anchor, Drawer } from "@mantine/core";
import './Navbar.css';

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust breakpoint as needed

  return (
    <div className="navbar">
      {/* Website Title */}
      <h1>Masjid Failaka</h1>

      {isSmallScreen ? (
        // Burger menu for small screens
        <>
          <Burger
            lineSize={3}
            size="md"
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          {/* Drawer to show menu when burger is clicked */}
          <Drawer
            opened={opened}
            onClose={close}
            padding="lg"
            title="Navigation"
            position="right"
          >
            <div className="drawer">
                <Anchor href="#about-us" onClick={close}>About Us</Anchor>
                <Anchor href="#support" onClick={close}>Support</Anchor>
                <Anchor href="#calendar" onClick={close}>Calendar</Anchor>
            </div>
          </Drawer>
        </>
      ) : (
        // Full navigation for larger screens
        <Group spacing="lg" gap="xl">
          <Anchor href="#about-us" size="md">About Us</Anchor>
          <Anchor href="#support" size="md">Support</Anchor>
          <Anchor href="#calendar" size="md">Calendar</Anchor>
        </Group>
      )}
    </div>
  );
};

export default Navbar;
