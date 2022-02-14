import { CommonHaspProps, createBaseObject } from "../openHasp";
import { Component, mergeProps, Show } from "solid-js";
import { ScreenProps } from "./ScreenProps";
import { makeStyles } from "../components/ScreenElements/makeStyles";
import { deleteHaspElement, store } from "../store/store";
import { DeleteElement } from "../components/ScreenElements/DeleteElement";

export interface ProgressBar extends CommonHaspProps {
  obj: "bar";
  min?: number;
  max?: number;
  start_value?: number;
}

export function createProgressBar(props: Omit<ProgressBar, "obj">): ProgressBar {
  const { min, max, start_value } = props;
  return {
    ...createBaseObject(props),
    min,
    max,
    start_value,
    obj: "bar",
  };
}

interface ProgressBarProps extends ScreenProps<ProgressBar["obj"]> {}

const defaults = {
  radius: 18,
  bg_color: "#4acaff",
};

export const ScreenProgressBar: Component<ProgressBarProps> = (p) => {
  p = mergeProps(defaults, p);
  const styles = makeStyles(p);
  const isSelected = () => {
    return store.selectedElement.id === p.id && store.selectedElement.page === p.page;
  };
  return (
    <button
      class="hasp-screen-item"
      classList={{ "outline-solid-yellow-500": isSelected() }}
      style={styles() + "background-color: white;"}
      onClick={p.onClick}
    >
      <Show when={isSelected()}>
        <DeleteElement onClick={() => deleteHaspElement({ page: p.page, id: p.id })} />
      </Show>
      <div
        class="rounded-full absolute right-1"
        style={{
          "background-color": p.bg_color,
          width: p.w - p.w / 3 + "px",
          height: p.h + "px",
          left: 0,
        }}
      />
    </button>
  );
};
