import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { useState, createContext, useMemo } from "react";

// https://mui.com/material-ui/customization/dark-mode/

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function StyleProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [preferedTheme, setPreferedTheme] = useLocalStorage(
    "theme",
    prefersDarkMode ? "dark" : "light"
  );
  const [mode, setMode] = useState(preferedTheme === "dark" ? "dark" : "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          setPreferedTheme(prevMode === "light" ? "dark" : "light");
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    [setPreferedTheme]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                text: {
                  primary: "#2d3436",
                  secondary: "#636e72",
                  tertiary: "#ffff",
                },
                background: {
                  paper: "#2980b9",
                  screen: "#ecf0f1",
                },
              }
            : {
                background: {
                  default: "#2c3e50",
                  paper: "#34495e",
                  screen: "#34495e",
                },
                text: {
                  tertiary: "#ffff",
                },
              }),
        },

        /*
          Overide not working, in CSS a transition is set for theme switching to avoid health issues to sensitive users
        */

        // overrides: {
        //   MuiCssBaseline: {
        //     "@global": {
        //       body: {
        //         transition: "all 1.0s linear",
        //       },
        //     },
        //   },
        // },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { ColorModeContext };
