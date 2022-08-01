/**
 * Northwestern typography imported in @/styles/globals
 */

const generic = `Arial, Helvetica, sans-serif`;

const sans = {
  sansBold: `AkkuratProBold, ${generic}`,
  sansBoldItalic: `AkkuratProBoldItali, ${generic}`,
  sansItalic: `AkkuratProItalic, ${generic}`,
  sansLight: `AkkuratProLight, ${generic}`,
  sansLightItalic: `AkkuratProLightItalic, ${generic}`,
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
