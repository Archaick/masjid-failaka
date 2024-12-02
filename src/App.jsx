import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import '@mantine/carousel/styles.css';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import History from "./components/History";
import  PrayersTime  from "./components/PrayersTime";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Donation from "./components/Donation";

function App() {
  return (
    <MantineProvider>
      <Navbar />
      <Hero />
      <History />
      <Gallery />
      <PrayersTime />
      <Donation />
      <Footer />
    </MantineProvider>
  );
}

export default App;
