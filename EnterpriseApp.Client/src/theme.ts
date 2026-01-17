import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep Navy Blue (Trustworthy/Enterprise)
    },
    secondary: {
      main: '#00b0ff', // Bright Blue (Action items)
    },
    background: {
      default: '#f4f6f8', // Light Grey background (easier on eyes than pure white)
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700, // Make headers bold
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Stop ALL CAPS buttons (looks more modern)
          borderRadius: 8, // Softer corners
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Modern card look
        },
      },
    },
  },
});