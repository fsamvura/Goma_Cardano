import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Box, ChakraProvider, extendTheme, useColorModeValue } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import WithSubnavigation from "../components/ui/Text/Navbar";

import "@fontsource/miriam-libre";
import "@fontsource/open-sans";

const theme = extendTheme({
  colors: {
    theme: {
      dark: "#121619",
      light: "#DDD8C4",
      blue: "#9BBAE6",
      green: "#79B995",
      gray: "#454545",
      lightGray: "#1c2634",
      cyan: "#00B5D8",
      yellow: "#EBBA6F",
    },
  },
  fonts: {
    heading: `'Miriam Libre', sans-serif`,
    body: `'Open Sans', serif`,
  },
  components: {
    Button: {
      defaultProps: {
        size: "lg",
        colorScheme: "orange",
      },
    },
    Heading: {
      baseStyle: {
        py: "5"
      }
    },
    Link: {
      baseStyle: {
        color: "theme.yellow"
      }
    }
  },
  styles: {
    global: {
      ".mdx-content": {
        h1: {
          fontSize: "4xl",
          fontWeight: "900",
          mb: "4",
          color: "theme.blue",
        },
        p: {
          fontSize: "lg",
          lineHeight: "1.4",
        },
        ul: {
          ml: "6",
        },
        li: {
          pl: "2",
          py: "2",
          listStyleType: "square",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Box minH="100vh">
            <WithSubnavigation />
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </ApolloProvider>
    </MeshProvider>
  );
}

export default MyApp;
