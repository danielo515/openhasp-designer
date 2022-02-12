import { Component, For, mergeProps, Show } from "solid-js";
import { deleteHaspElement, store } from "../../store";
import { DeleteElement } from "./DeleteElement";
import { makeStyles } from "./makeStyles";
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
  const styles = makeStyles(p);
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
        <DeleteElement onClick={() => deleteHaspElement({ page: p.page, id: p.id })} />
      </Show>
      <For each={parseIcons(p.text)}>{(icon) => icon}</For>
    </button>
  );
};
