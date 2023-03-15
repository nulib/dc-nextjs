import localFont from "@next/font/local";

/**
 * Northwestern typography imported in @/styles/globals
 */

export const akkuratLight = localFont({
  display: "swap",
  src: [
    {
      path: "./fonts/AkkuratProLight.woff",
      style: "normal",
    },
    {
      path: "./fonts/AkkuratProLightItalic.woff",
      style: "italic",
    },
  ],
  variable: "--font-akkurat-light",
});
export const akkurat = localFont({
  display: "swap",
  src: [
    {
      path: "./fonts/AkkuratProRegular.woff",
      style: "normal",
    },
    {
      path: "./fonts/AkkuratProItalic.woff",
      style: "italic",
    },
  ],
  variable: "--font-akkurat",
});
export const akkuratBold = localFont({
  display: "swap",
  src: [
    {
      path: "./fonts/AkkuratProBold.woff",
      style: "normal",
    },
    {
      path: "./fonts/AkkuratProBoldItalic.woff",
      style: "italic",
    },
  ],
  variable: "--font-akkurat-bold",
});
export const campton = localFont({
  display: "swap",
  src: "./fonts/CamptonBook.woff",
  variable: "--font-campton",
});
export const camptonBold = localFont({
  display: "swap",
  src: "./fonts/CamptonBold.woff",
  variable: "--font-campton-bold",
});
export const camptonExtraBold = localFont({
  display: "swap",
  src: "./fonts/CamptonExtraBold.woff",
  variable: "--font-campton-extra-bold",
});
export const camptonExtraLight = localFont({
  display: "swap",
  src: "./fonts/CamptonExtraLight.woff",
  variable: "--font-campton-extra-light",
});

const generic = `Arial, Helvetica, sans-serif`;

const sans = {
  northwesternSansBold: `var(--font-akkurat-bold), var(--font-akkurat), ${generic} `,
  northwesternSansLight: `var(--font-akkurat-light), var(--font-akkurat), ${generic}`,
  northwesternSansRegular: `var(--font-akkurat), ${generic}`,
};

const display = {
  northwesternDisplayBold: `var(--font-campton-bold), ${generic}`,
  northwesternDisplayBook: `var(--font-campton), ${generic}`,
  northwesternDisplayExtraBold: `var(--font-campton-extra-bold), ${generic}`,
  northwesternDisplayExtraLight: `var(--font-campton-extra-light), ${generic}`,
};

const fonts = {
  ...display,
  ...sans,
};

export default fonts;
