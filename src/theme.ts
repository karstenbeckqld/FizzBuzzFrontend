import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: "#050b15",
    800: "#182134",
    700: "#2a3655",
    600: "#3b4c77",
    500: "#4c6298",
    400: "#657bb2",
    300: "#8799c3",
    200: "#a9b6d4",
    100: "#cbd3e7",
    50: "#ecf0fc",
  },
  accentRed: {
    900: "#200000",
    800: "#4f0000",
    700: "#800004",
    600: "#b30007",
    500: "#e5010a",
    400: "#fe1a23",
    300: "#ff4c53",
    200: "#ff7f84",
    100: "#ffb1b4",
    50: "#ffe2e4",
  },
  accentBlue: {
     50: '#def5ff',
  100: '#b1dfff',
  200: '#84c9fa',
  300: '#55b3f6',
  400: '#2b9df3',
  500: '#1584d9',
  600: '#0967aa',
  700: '#00497a',
  800: '#002c4c',
  900: '#00101e',
  },
};

const fonts = {
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

const theme = extendTheme({ config, colors, fonts });

export default theme;
