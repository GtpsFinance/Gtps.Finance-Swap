import React, { useMemo } from 'react';
// @ts-ignore import { transparentize } from 'polished';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
} from 'styled-components';
import { useIsDarkMode } from '../state/user/hooks';
import { Text, TextProps } from 'rebass';
import { Colors } from './styled';

export * from './components';

const MEDIA_WIDTHS = {
  upToExtraSmall: 540,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  },
  {}
) as any;

const white = '#FFFFFF';
const black = '#000000';

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#FFFFFF',
    text2: darkMode ? '#FFFFFF' : '#FFFFFF',
    text3: darkMode ? '#FFFFFF' : '#FFFFFF',
    text4: darkMode ? '#FFFFFF' : '#FFFFFF',
    text5: darkMode ? '#FFFFFF' : '#FFFFFF',

    // backgrounds / greys
    bg1: darkMode ? '#0D0BB1' : '#0D0BB1',
    bg2: darkMode ? '#1d1f24' : '#0D0BB1',
    bg3: darkMode ? '#1d1f24' : '#0D0BB1',
    bg4: darkMode ? '#1d1f24' : '#0D0BB1',
    bg5: darkMode ? '#1d1f24' : '#0D0BB1',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(251,17,142,0.6)',

    //primary colors
    primary1: '#2792d6',
    primary2: '#3099db',
    primary3: '#389fe0',
    primary4: '#54afe8',
    primary5: '#5fb3e8',

    // color text
    primaryText1: darkMode ? '#fff' : '#000',

    // secondary colors
    secondary1: '#FFFFFF',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#fffffC',
  };
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />;
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />;
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />;
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />;
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />;
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />;
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />;
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />;
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />;
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />;
  },
};

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: none
  font-display: fallback;
}
html,
body {
  margin: 0;
  padding: 0;
}
a {
  color: ${colors(false).blue1};
}
* {
  box-sizing: border-box;
}
img {
  border:solid
}
button {
  user-select: none;
}
html {
  font-size: 18px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`;

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: rgba(250, 250, 250, 1);
  background-color: rgba(13,11,177,0) 100%);
}
body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: radial-gradient(50% 50% at 50% 50%,rgb(5 8 10 / 96%) 0%,rgba(13,11,177,0) 100%);
}
`;
