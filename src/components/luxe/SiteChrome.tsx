import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { Loader } from "./Loader";
import { WhatsAppButton } from "./WhatsAppButton";
import { QuoteProvider } from "./QuoteModal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function SiteChrome({ children }: { children: ReactNode }) {
  useSmoothScroll();

  return (
    <QuoteProvider>
      <Loader />
      <Cursor />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </QuoteProvider>
  );
}