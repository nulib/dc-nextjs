import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import Header from "@/components/Header/Header";
import React from "react";
import { defaultOpenGraphData } from "@/lib/open-graph";
import { styled } from "@/stitches.config";

const MainStyled = styled("main", {
  minHeight: "300px",
});

interface LayoutProps {
  children: React.ReactNode;
  description?: string;
  header?: "default" | "hero";
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  description = defaultOpenGraphData["og:description"],
  header = "default",
  title
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const titleTagText = `${title ? `${title} - ` : ''}${defaultOpenGraphData["og:site_name"]}`;
  const metaDescriptionContent = description;

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metaDescriptionContent} />
        <title>{titleTagText}</title>
      </Head>
      <Header isHero={header === "hero"} />
      <MainStyled>{children}</MainStyled>
      <Footer />
    </>
  );
};

export default Layout;
