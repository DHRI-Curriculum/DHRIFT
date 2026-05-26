/**
 * Theme configuration for DHRIFT components
 * Contains color palettes and theming utilities
 */

// Color palettes for workshop cover pages, organized by programming language theme
export const colorPalettes = {
  teal: {
    primary: ['#3d8b87', '#2a6b68', '#1d4e4c', '#4a9e99', '#267d78'],
    accent: ['#5ec4bd', '#7dd4cf', '#2e9d96', '#45b5ae', '#1a8580'],
    dark: ['#1a3635', '#0f2524', '#142d2c', '#1e3f3d', '#0a1c1b'],
  },
  gold: {
    primary: ['#c4a35a', '#b8943f', '#a67c1a', '#d4b76e', '#dcc482'],
    accent: ['#f0db4f', '#e5cd3a', '#d4bc2a', '#f5e066', '#c9b033'],
    dark: ['#3d3520', '#2a2515', '#4a4028', '#1f1a0d', '#332c1a'],
  },
  blue: {
    primary: ['#4a90a4', '#3a7a8e', '#2a6478', '#5aa0b4', '#6ab0c4'],
    accent: ['#7cc4d8', '#5db4ca', '#4da4ba', '#8dd4e8', '#3d94aa'],
    dark: ['#1a2d35', '#0f2028', '#14252d', '#1e353f', '#0a181e'],
  },
  brown: {
    primary: ['#6d5a4a', '#5d4a3a', '#4d3a2a', '#7d6a5a', '#8d7a6a'],
    accent: ['#a08060', '#b09070', '#90705a', '#c0a080', '#806040'],
    dark: ['#2a2320', '#1a1815', '#352d28', '#0f0d0c', '#201c18'],
  },
  default: {
    primary: ['#3a3540', '#2a2530', '#4a4550', '#5a5560', '#1a1520'],
    accent: ['#6a6570', '#7a7580', '#5a5560', '#8a8590', '#4a4550'],
    dark: ['#1a1520', '#0f0d12', '#252030', '#0a0810', '#15101a'],
  },
};

// Available theme keys
export const themeKeys = ['teal', 'gold', 'blue', 'brown', 'default'];

/**
 * Get theme key - accepts explicit theme or falls back to default
 * @param {string} theme - Explicit theme from frontmatter (e.g., 'teal', 'gold')
 * @returns {string} - The validated theme key
 */
export const getThemeKey = (theme) => {
  const normalized = theme?.toLowerCase();
  return themeKeys.includes(normalized) ? normalized : 'default';
};

/**
 * Get palette for a specific programming language
 * @param {string} programmingLanguage - The programming language
 * @returns {object} - The color palette
 */
export const getPalette = (programmingLanguage) => {
  const themeKey = getThemeKey(programmingLanguage);
  return colorPalettes[themeKey];
};
