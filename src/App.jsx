import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Navbar from './components/Navbar'

function App() {
  return (
    <MantineProvider >
        <div>
          <Navbar />
        </div>
    </MantineProvider>
  );
}

export default App;
