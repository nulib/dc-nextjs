const generic = `Arial, Helvetica, sans-serif`;

const sans = [
  {
    key: "northwesternSansLight",
    name: "Akkurat Pro Light",
    value: "https://common.northwestern.edu/v8/css/fonts/AkkuratProLight.woff",
  },
  {
    key: "northwesternSansRegular",
    name: "Akkurat Pro Regular",
    value:
      "https://common.northwestern.edu/v8/css/fonts/AkkuratProRegular.woff",
  },
  {
    key: "northwesternSansBold",
    name: "Akkurat Pro Bold",
    value: "https://common.northwestern.edu/v8/css/fonts/AkkuratProBold.woff",
  },
];

const display = [
  {
    key: "northwesternDisplayLight",
    name: "Poppins Light",
    value: "https://common.northwestern.edu/v8/css/fonts/Poppins-Light.woff",
  },
  {
    key: "northwesternDisplayBold",
    name: "Poppins Bold",
    value: "https://common.northwestern.edu/v8/css/fonts/Poppins-Bold.woff",
  },
  {
    key: "northwesternDisplayExtraBold",
    name: "Poppins Extra Bold",
    value:
      "https://common.northwestern.edu/v8/css/fonts/Poppins-ExtraBold.woff",
  },
  {
    key: "northwesternDisplayExtraLight",
    name: "Poppins Extra Light",
    value:
      "https://common.northwestern.edu/v8/css/fonts/Poppins-ExtraLight.woff",
  },
];

const serif = [
  {
    key: "northwesternSerifRegular",
    name: "Noto Serif Regular",
    value:
      "https://common.northwestern.edu/v8/css/fonts/noto-serif-v16-latin-italic.woff",
  },
  {
    key: "northwesternSerifBold",
    name: "Noto Serif Bold",
    value:
      "https://common.northwestern.edu/v8/css/fonts/noto-serif-v16-latin-700italic.woff",
  },
];

export const northwesternFonts = [...display, ...sans, ...serif];

const fonts = northwesternFonts.reduce(
  (acc: { [key: string]: string }, { key, name }) => {
    acc[key] = `${name}, ${generic}`;
    return acc;
  },
  {},
);

export default fonts;
