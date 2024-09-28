import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./assets/styles/index.css";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  colors,
  createTheme,
} from "@mui/material";
import { Colors } from "./utils/Colors.ts";

export const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          ":hover": {
            backgroundColor: Colors.primary.main,
          },
          "&.Mui-selected": {
            backgroundColor: Colors.primary.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: Colors.primary.main,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          position: "absolute",
          bottom: "3rem",
          right: "3rem",
        },
        primary: {
          backgroundColor: Colors.primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: Colors.primary.dark,
          },
        }
      },
    },
  },
  palette: {
    background: Colors.background,
    primary: Colors.primary,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "button, h1, h2, h3, h4, h5, h6, p": {
            color: colors.grey[100],
          },
        }}
      />
      <App />
    </ThemeProvider>
  </StrictMode>
);
