import { Component } from "solid-js";

interface AreaProps {
  // add props here
}

export const Area: Component<AreaProps> = (p) => {
  const style = {
    "border-color": "var(--divider-color)",
  };
  return <div>{p.children}</div>;
};
