import { Component, ComponentProps } from "solid-js";

interface RowProps {
  // add props here
}

const Row: Component<RowProps> = (props) => {
  return <div class="py-2 flex flex-row space-x-2">{props.children}</div>;
};

export default Row;
