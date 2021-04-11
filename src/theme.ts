// @ts-nocheck

import { createMuiTheme } from "@material-ui/core/styles";
import { Palette } from "@material-ui/icons";

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Helvetica Neue",
      "Helvetica",
      "Segoe UI",
      "Tahoma",
      "Arial",
      "sans-serif",
    ],
    h3: {
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: "#611f69",
    },
    secondary: {
      main: "#4285f4",
      light: "rgba(29,155,209, 0.3)",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        "&:focus": {
          boxShadow: "0px 0px 0px 4px rgba(29,155,209, 0.3)",
        },
      },
      contained: {
        "&:focus": {
          boxShadow: "0px 0px 0px 4px rgba(29,155,209, 0.3)",
        },
      },
    },
    MuiLink: {
      root: {
        cursor: "pointer",
        "&:focus": {
          boxShadow: "0px 0px 0px 4px rgba(29,155,209, 0.3)",
        },
        "&:hover": {
          color: "#4285f4"
        }
      },
    },
  },
});
