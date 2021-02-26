import { ThemeProvider } from "styled-components";
import { Provider } from "next-auth/client";
import { ToastProvider } from "../contexts/toast";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "../styles/global";
import theme from "../styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ToastContainer />
          <GlobalStyle />
          <Component {...pageProps} />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}
