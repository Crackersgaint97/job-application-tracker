import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function Navbar() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <BusinessCenterIcon sx={{ mr: 2 }} />
          <Box display="flex" flexDirection="column">
             <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              KED Creative Careers
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Job Application Tracker
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}