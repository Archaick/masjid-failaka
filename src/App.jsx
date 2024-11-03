import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { HeaderMenu } from "./components/HeaderMenu";

function App() {
  return (
    <MantineProvider>
      <HeaderMenu />
    </MantineProvider>
  );
}

export default App;
