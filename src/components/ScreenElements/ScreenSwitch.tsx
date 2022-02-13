import { Component, mergeProps, Show } from "solid-js";
import { HaspSwitch } from "../../openHasp";
import { deleteHaspElement, store } from "../../store/store";
import { DeleteElement } from "./DeleteElement";
import { makeStyles } from "./makeStyles";

interface ScreenSwitchProps extends Partial<HaspSwitch> {
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

const switchDefaults = {
  radius: 18,
  bg_color: "#4acaff",
  bg_color1: "white",
  bg_color2: "white",
};

export const ScreenSwitch: Component<ScreenSwitchProps> = (p) => {
  p = mergeProps(switchDefaults, p);
  const styles = makeStyles(p);
  const isSelected = () => {
    return store.selectedElement.id === p.id && store.selectedElement.page === p.page;
  };
  return (
    <button
      class="hasp-screen-item"
      classList={{ "outline-solid-yellow-500": isSelected() }}
      style={styles()}
      onClick={p.onClick}
    >
      <Show when={isSelected()}>
        <DeleteElement onClick={() => deleteHaspElement({ page: p.page, id: p.id })} />
      </Show>
      <div
        class="rounded-full absolute right-1"
        style={{
          "background-color": p.bg_color2,
          height: "20px",
          width: "20px",
        }}
      />
    </button>
  );
};
