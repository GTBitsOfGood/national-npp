import { extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #__next": {
        margin: "0",
        padding: "0",
        width: "100%",
        height: "100%",
        color: "#333333",
        backgroundColor: "#EBEEF1",
      },
      "*": {
        boxSizing: "border-box",
      },
    },
  },
  colors: {
    surface: "#FFFFFF",
    primary: "#0069CA",
    secondary: "#80D2C8",
    border: "#BCC5D1",
    danger: "#F2594B",
    primaryText: "#333333",
    secondaryText: "#657788",
  },
  components: {
    Steps,
    Button: {
      variants: {
        primary: {
          backgroundColor: "#0069CA",
          color: "#FFFFFF",
        },
        secondary: {
          backgroundColor: "",
          color: "#0069CA",
        },
        danger: {
          backgroundColor: "#F2594B",
          color: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
