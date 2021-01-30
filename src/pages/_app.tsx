import { ThemeProvider } from "styled-components";
import { Provider } from "next-auth/client";

import GlobalStyle from "../styles/global";
import theme from "../styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
