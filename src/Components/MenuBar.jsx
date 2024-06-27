import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAccessible, logout } from "../handlers/auth";
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

// Main Menu Bar which shows is All Pages
export function MenuBar() {
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      homeWhite: {
        main: 'inherit',
        light: 'inherit',
        dark: 'inherit',
        contrastText: 'white',
      }
    }
  });

  // Logout button handle
  function handleLogout() {
    logout();
    navigate("/");
    location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button variant="contained" color="homeWhite" onClick={() => navigate("/")}>
              Home
            </Button>
          </Typography>
          {
            isAccessible() && 
            (
              <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
            )
          }
          {
            !isAccessible() && 
            (
              <>
                <Button color="inherit" onClick={() => navigate("/signup")}>Signup</Button>
                <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}