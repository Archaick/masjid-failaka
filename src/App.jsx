import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import History from "./components/History";
import  PrayersTime  from "./components/PrayersTime";

function App() {
  return (
    <MantineProvider>
      <Navbar />
      <Hero />
      <History />
      <PrayersTime />
    </MantineProvider>
  );
}

export default App;
