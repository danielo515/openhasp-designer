import { Component, For } from "solid-js";
import { store } from "../../store";

// function to convert from E045 to f0045

interface ScreenButtonProps {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  radius: number;
  page: number;
  id: number;
  border_width: number;
  border_color: string;
  onClick: () => void;
}

const iconRegex = /\\u[A-F0-9]{4,5}/g;

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

const parseIcons = (icon: string) => {
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

export const ScreenButton: Component<ScreenButtonProps> = (p) => {
  const styles = () => `
    top: ${p.y}px; 
    left: ${p.x}px; 
    width: ${p.w}px; 
    height: ${p.h}px;
    border-radius: ${p.radius}px;
    border-width: ${p.border_width}px;
    border-color: ${p.border_color};
    `;
  const isSelected = () => {
    return store.selectedElement.id === p.id && store.selectedElement.page === p.page;
  };
  return (
    <button
      class="hasp-button"
      classList={{ "outline-solid-yellow-500": isSelected() }}
      style={styles()}
      onClick={p.onClick}
    >
      <For each={parseIcons(p.text)}>{(icon) => icon}</For>
    </button>
  );
};
