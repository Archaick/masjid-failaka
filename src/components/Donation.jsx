import React from "react";
import { Container, Title, Text, Overlay } from "@mantine/core";
import "./Donation.css";

const Donation = () => {
  return (
    <div className="donation-banner" id="support">
      <Overlay
        gradient="linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
        opacity={0.9}
        zIndex={1}
      />
      <Container className="donation-content">
        <Title className="donation-header" align="center">
          Be a Part of Something Greater<span className="test">Don't Click</span><span>⚠️</span>
        </Title>

        <Text align="center" color="#fff" mt="sm">
          Your generosity makes a real difference. Join hands to support our
          Masjid and community.
        </Text>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
          className="paypal-button-form"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="NL95MKT2TNC2E" />
          <input type="hidden" name="currency_code" value="USD" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate Now"
          />
        </form>
      </Container>
    </div>
  );
};

export default Donation;
