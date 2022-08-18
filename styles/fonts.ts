/**
 * Northwestern typography imported in @/styles/globals
 */

const generic = `AkkuratProRegular, Arial, Helvetica, sans-serif`;

const sans = {
  sansBold: `AkkuratProBold, AkkuratProRegular, ${generic} `,
  sansBoldItalic: `AkkuratProBoldItalic, AkkuratProRegular, ${generic}`,
  sansItalic: `AkkuratProItalic, AkkuratProRegular, ${generic}`,
  sansLight: `AkkuratProLight, AkkuratProRegular, ${generic}`,
  sansLightItalic: `AkkuratProLightItalic, AkkuratProRegular, ${generic}`,
  sansRegular: `AkkuratProRegular, ${generic}`,
};

const display = {
  displayBold: `CamptonBold, ${generic}`,
  displayBook: `CamptonBook, ${generic}`,
  displayExtraBold: `CamptonExtraBold, ${generic}`,
  displayExtraLight: `CamptonExtraLight, ${generic}`,
};

const fonts = {
  ...display,
  ...sans,
};

export default fonts;
