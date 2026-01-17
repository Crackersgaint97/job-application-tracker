import Dashboard from './components/Dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme'; // Import your custom theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;