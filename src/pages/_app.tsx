import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Layout from "src/components/shared/Layout";
import theme from "src/utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
