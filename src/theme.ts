// @ts-nocheck

import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Lato"].join(","),
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      color: "#5B5A5B",
    },
  },
  palette: {
    primary: {
      light: "#A493A7",
      main: /*"#611f69"*/ "rgb(136,101,135)",
      dark: "#4A154B",
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
          color: "#4285f4",
        },
      },
    },
    MuiSvgIcon: {
      fontSizeSmall: {
        fontSize: 11,
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: 0,
        fontSize: "0.8rem",
      },
      label: {
        flexDirection: "column",
        maxWidth: "fit-content",
      },
    },
    MuiMenuItem: {
      root: {
        "&:hover": {
          backgroundColor: "#4285f4",
          color: "#fff",
        },
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "rgba(29,155,209, 0.3)",
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 35,
      },
    },
    MuiAccordion: {
      root: {
        "&$expanded": {
          margin: "auto",
        },
      },
    },
    MuiTypography: {
      body1: {
        fontSize: "0.9rem",
        wordBreak: "break-word",
      },
      subtitle2: {
        fontWeight: 700,
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 0,
      },
    },
    MuiListItemAvatar: {
      root: {
        minWidth: 33,
      },
    },
  },
});
