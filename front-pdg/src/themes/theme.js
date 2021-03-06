import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2764E3",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    inherit: {
      main: "#ffff",
    },
  },
  typography: {
    h5: {
      color: "white",
    },
    h4: {
      color: "#EE1C25",
    },
    
  },
});

export default theme;
