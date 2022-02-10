import { Component, For, mergeProps } from "solid-js";
import { CommonHaspProps } from "../../openHasp";
import { store } from "../../store";
import { parseIcons } from "./parseIcons";

interface ScreenButtonProps {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  radius: number;
  page: number;
  id: number;
  border_width?: number;
  border_color?: string;
  onClick: () => void;
}
const buttonDefaults = {
  border_color: "#62d2ff",
  bg_color: "#4acaff",
  bg_grad_color: "#0081b5",
  border_width: 1,
  radius: 8,
};

export const ScreenButton: Component<ScreenButtonProps> = (p) => {
  const styles = makeStyles(mergeProps(buttonDefaults, p));
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
function makeStyles(p: CommonHaspProps) {
  const borderSides = {
    0: [] as string[],
    1: ["bottom"],
    2: ["top"],
    3: ["top", "bottom"],
    4: ["left"],
    5: ["left", "bottom"],
    6: ["left", "top"],
    8: ["right"],
    15: ["right", "left", "top", "bottom"],
  };
  return () => `
    top: ${p.y}px; 
    left: ${p.x}px; 
    width: ${p.w}px; 
    height: ${p.h}px;
    border-radius: ${p.radius}px;
    ${p.border_side ?? `border-width: ${p.border_width}px;`}
    border-color: ${p.border_color};
    background-color: ${p.bg_color};
    background-image: linear-gradient(${p.bg_color} 0%, ${p.bg_grad_color} 100%);
    ${borderSides[p.border_side ?? 0]
      .map((side) => `border-${side}-width: ${p.border_width}px;`)
      .join("\n")}
    `;
}
