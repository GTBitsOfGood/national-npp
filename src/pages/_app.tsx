import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Auth from "src/components/shared/Auth";
import Layout from "src/components/shared/Layout";
import theme from "src/utils/theme";
import { AuthComponent } from "src/utils/types";

function MyApp({ Component, pageProps }: AppProps) {
  const AuthComponent = Component as AuthComponent;

  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <Layout>
          <Auth pageAuth={AuthComponent.auth}>
            <Component {...pageProps} />
          </Auth>
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
