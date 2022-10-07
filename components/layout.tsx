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
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="NUL Digital Collections v2" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{title}</title>
      </Head>
      <Header isHero={header === "hero"} />
      <main>{children}</main>
      <Footer />
      <Message />
    </div>
  );
};

export default Layout;
