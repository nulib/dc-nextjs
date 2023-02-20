import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import Header from "@/components/Header/Header";
import React from "react";
import { styled } from "@/stitches.config";

export const siteTitle = "Digital Collections v2";

const MainStyled = styled("main", {
  minHeight: "300px",
});

interface LayoutProps {
  children: React.ReactNode;
  header?: "default" | "hero";
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header = "default",
  title = "Digital Collections - Northwestern University Libraries",
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="NUL Digital Collections v2" />
        <title>{title}</title>
      </Head>
      <Header isHero={header === "hero"} />
      <MainStyled>{children}</MainStyled>
      <Footer />

      {/* De-activated temporarily */}
      {/* <Message /> */}
    </>
  );
};

export default Layout;
