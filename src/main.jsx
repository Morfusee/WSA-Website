import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Colors } from "./utils/Colors.js";

const theme = createTheme({
  palette: {
    background: Colors.background,
    primary: Colors.primary,
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //   },
  // },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);

