/**
 * Northwestern typography imported in @/styles/globals
 */

const generic = `AkkuratProRegular, Arial, Helvetica, sans-serif`;

const sans = {
  northwesternSansBold: `AkkuratProBold, AkkuratProRegular, ${generic} `,
  northwesternSansBoldItalic: `AkkuratProBoldItalic, AkkuratProRegular, ${generic}`,
  northwesternSansItalic: `AkkuratProItalic, AkkuratProRegular, ${generic}`,
  northwesternSansLight: `AkkuratProLight, AkkuratProRegular, ${generic}`,
  northwesternSansLightItalic: `AkkuratProLightItalic, AkkuratProRegular, ${generic}`,
  northwesternSansRegular: `AkkuratProRegular, ${generic}`,
};

const display = {
  northwesternDisplayBold: `CamptonBold, ${generic}`,
  northwesternDisplayBook: `CamptonBook, ${generic}`,
  northwesternDisplayExtraBold: `CamptonExtraBold, ${generic}`,
  northwesternDisplayExtraLight: `CamptonExtraLight, ${generic}`,
};

const fonts = {
  ...display,
  ...sans,
};

export default fonts;
