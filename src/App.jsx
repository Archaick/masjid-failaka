import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import  PrayersTime  from "./components/PrayersTime";

function App() {
  return (
    <MantineProvider>
      <Navbar />
      <Hero />
      <PrayersTime />
    </MantineProvider>
  );
}

export default App;
