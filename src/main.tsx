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
          color: Colors.primary.light,
          backgroundColor: Colors.primary.dark,
          "&:hover": {
            backgroundColor: colors.blueGrey[800],
          },
          textTransform: "none",
          fontWeight: "bold",
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
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: colors.grey[400],
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: Colors.primary.light,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.grey[400],
        },
        focused: {
          color: colors.grey[500],
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "white",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.primary.dark,
          color: "white",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: Colors.primary.main,
          },
          "&.Mui-selected": {
            backgroundColor: Colors.primary.main,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.primary.dark,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white",
          "&:hover": {
            backgroundColor: Colors.primary.dark,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: colors.blueGrey[700],
        },
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
