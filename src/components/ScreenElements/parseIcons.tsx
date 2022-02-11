export const iconRegex = /\\u[A-F0-9]{4,5}/gi;

/**
 * Translates the icon hexadecimal value that openHasp uses to a unicode character
 * that exists on the font that we use.
 * On the process it adds a factor which is what openHasp subtracts when converting their icons
 */
const translateIcon = (icon: string) => {
  const factor = 925696;
  const prefix = "&#x";
  const number = parseInt(icon.slice(2), 16);
  const converted = number + factor;
  return `${prefix}${converted.toString(16)};`;
};

export const parseIcons = (icon: string) => {
  const positions = icon.split(iconRegex);
  const substitutions = icon.match(iconRegex);
  const { result } = positions.reduce(
    (acc, position) => {
      const { cursor, result } = acc;
      if (position === "") {
        const rawIcon = substitutions[cursor];
        if (!rawIcon) return { cursor, result };
        const iconInHTML = translateIcon(rawIcon);
        return {
          cursor: cursor + 1,
          result: [...result, <span class="material-icons" innerHTML={iconInHTML} />],
        };
      }
      return { cursor, result: [...result, position] };
    },
    { cursor: 0, result: [] }
  );

  return result;
};
