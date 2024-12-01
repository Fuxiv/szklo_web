export const size = {
  none: 0,
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const device = {
  none: `(max-width: ${size.mobile}px)`,
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  laptop: `(max-width: ${size.laptop}px)`,
  laptopL: `(max-width: ${size.laptopL}px)`,
  desktop: `(max-width: ${size.desktop}px)`,
  desktopL: `(max-width: ${size.desktop}px)`,
};

export const deviceInterval = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile}px) and (max-width: ${size.tablet}px)`,
  laptop: `(min-width: ${size.tablet}px) and (max-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptop}px) and (max-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.laptop}px) and (max-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktop}px) and (max-width: ${size.desktop}px)`,
};
