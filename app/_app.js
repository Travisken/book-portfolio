// pages/_app.js
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </NextThemesProvider>
    </HeroUIProvider>
  )
}

export default MyApp;