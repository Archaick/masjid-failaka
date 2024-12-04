import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Burger, Group, Anchor, Drawer, Text } from "@mantine/core";
import './Navbar.css';

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="navbar">
      <Text component="h1" size="xl" weight={700} color="white">
        Masjid Failaka <span className="test">[Test]</span>
      </Text>

      {isSmallScreen ? (
        <>
          <Burger
            lineSize={3}
            size="md"
            color="#0c0c0c"
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Drawer
            opened={opened}
            onClose={close}
            padding="lg"
            title="Masjid Failaka"
            position="right"
            overlayOpacity={{ backgroundOpacity: 0.5, blur: 4 }}
            transition="slide-right"
            styles={{
              drawer: { backgroundColor: '#1a1a2e', color: '#0c0c0c' },
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
        <Group spacing="lg" gap="xl" className="nav-links">
          <Anchor href="#about-us" size="md">About Us</Anchor>
          <Anchor href="#support" size="md">Support</Anchor>
          <Anchor href="#prayers" size="md">Prayers</Anchor>
        </Group>
      )}
    </div>
  );
};

export default Navbar;
