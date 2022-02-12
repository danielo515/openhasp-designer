import { Component, For, mergeProps, Show } from "solid-js";
import { store } from "../../store";
import { DeleteElement } from "./DeleteElement";
import { makeStyles } from "./makeStyles";
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
      <Show when={isSelected()}>
        <DeleteElement onClick={() => console.log("delete")} />
      </Show>
      <For each={parseIcons(p.text)}>{(icon) => icon}</For>
    </button>
  );
};
