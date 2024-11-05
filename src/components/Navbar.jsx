import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Burger, Group, Anchor, Drawer, Text } from "@mantine/core";
import './Navbar.css';

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="navbar">
      {/* Website Title */}
      <Text component="h1" size="xl" weight={700} color="white">
        Masjid Failaka
      </Text>

      {isSmallScreen ? (
        <>
          <Burger
            lineSize={3}
            size="md"
            color="#ffffff"
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Drawer
            opened={opened}
            onClose={close}
            padding="lg"
            title="Navigation"
            position="right"
            overlayOpacity={0.55}
            overlayBlur={3}
            transition="slide-right"
            styles={{
              drawer: { backgroundColor: '#1a1a2e', color: '#ffffff' },
              header: { backgroundColor: '#1a1a2e' },
              closeButton: { color: '#ffffff' },
              title: { color: '#ffffff', fontSize: '1.25rem' }
            }}
          >
            <div className="drawer">
              <Anchor href="#about-us" onClick={close}>About Us</Anchor>
              <Anchor href="#support" onClick={close}>Support</Anchor>
              <Anchor href="#prayers" onClick={close}>Prayers</Anchor>
            </div>
          </Drawer>
        </>
      ) : (
        <Group spacing="lg" gap="xl">
          <Anchor href="#about-us" size="md">About Us</Anchor>
          <Anchor href="#support" size="md">Support</Anchor>
          <Anchor href="#prayers" size="md">Prayers</Anchor>
        </Group>
      )}
    </div>
  );
};

export default Navbar;
