import { Component, For, mergeProps, Show } from "solid-js";
import { deleteHaspElement, store } from "../../store/store";
import { DeleteElement } from "./DeleteElement";
import { makeStyles } from "./makeStyles";

interface ScreenBasicObjProps {
  x: number;
  y: number;
  w: number;
  h: number;
  page: number;
  id: number;
  radius?: number;
  border_width?: number;
  border_color?: string;
  onClick: () => void;
}
const defaults = {
  border_color: "#62d2ff",
  border_width: 1,
  radius: 8,
};

export const ScreenBasicObj: Component<ScreenBasicObjProps> = (p) => {
  const styles = makeStyles(mergeProps(defaults, p));
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
    </button>
  );
};
