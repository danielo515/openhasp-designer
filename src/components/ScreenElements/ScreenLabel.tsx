import { Component, For } from "solid-js";
import { store } from "../../store";
import { parseIcons } from "./parseIcons";

interface ScreenLabelProps {
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

export const ScreenLabel: Component<ScreenLabelProps> = (p) => {
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
