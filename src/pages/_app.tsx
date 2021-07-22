import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Layout from "src/components/shared/Layout";
import "src/global.css";

// TODO: Move to separate file
const theme = extendTheme({
  components: {
    Steps,
  },
});

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
