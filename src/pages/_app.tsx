import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import Sidenav from "./../components/sidebar/Sidenav";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "./../components/topbar/topbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidenav />
          <div className="content">
            <Topbar />
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </ProSidebarProvider>
  );
}
