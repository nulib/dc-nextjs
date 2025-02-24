import { northwesternFonts } from "@/styles/fonts";

const Fonts = () => {
  return (
    <>
      {northwesternFonts.map((font) => (
        <link
          key={font.key}
          rel="preload"
          href={font.value}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};

export default Fonts;
