import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <MantineProvider>
      <Navbar />
      <Hero />
    </MantineProvider>
  );
}

export default App;
