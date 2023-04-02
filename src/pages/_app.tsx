import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Sidenav from "./../components/sidebar/Sidenav";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "./../components/topbar/topbar";
import { ColorModeContext, useMode } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, colorMode } = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <div className="app">
            <Sidenav />
            <div className="content">
              <Topbar />
              <Component {...pageProps} />
            </div>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
