const colorMappings = {
  cyan: "#00FFFF",
  aqua: "#00FF00",
  lime: "#008080",
  pink: "#FFC0CB",
  green: "#008000",
  orchid: "#DA70D6",
  teal: "#008080",
  violet: "#EE82EE",
  blue: "#0000FF",
  magenta: "#FF00FF",
  fuchsia: "#FF0000",
  navy: "#000080",
  purple: "#800080",
  olive: "#4B0082",
  indigo: "#CD853F",
  peru: "#B00000",
  blush: "#A0522D",
  sienna: "#A52A2A",
  red: "#FF0000",
  brown: "#FF6347",
  tomato: "#FFA500",
  maroon: "#800000",
  salmon: "#FA8072",
  white: "#FFFFFF",
  coral: "#FF7F50",
  snow: "#FFFFFA",
  orange: "#FFA500",
  gold: "#FFD700",
  linen: "#FAF0E6",
  khaki: "#F0E68C",
  azure: "#F0FFFF",
  bisque: "#FFE4C4",
  silver: "#C0C0C0",
  wheat: "#F5DEB3",
  grey: "#808080",
  gray: "#808080",
  tan: "#D2B48C",
  black: "#000000",
} as const;

export function mapNameToColor(name?: string): string {
  return colorMappings[name?.toLowerCase()] ?? name;
}