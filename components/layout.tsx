import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Message from "@/components/Shared/Message/Message";
import React from "react";

export const siteTitle = "Digital Collections v2";

interface LayoutProps {
  children: React.ReactNode;
  header?: "default" | "hero";
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header = "default",
  title,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="description" content="NUL Digital Collections v2" />
        <title>{title}</title>
      </Head>
      <Header isHero={header === "hero"} />
      <main>{children}</main>
      <Footer />
      <Message />
    </>
  );
};

export default Layout;
