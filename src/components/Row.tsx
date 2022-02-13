import { Component, ComponentProps } from "solid-js";

interface RowProps {
  class?: string;
}

const Row: Component<RowProps> = (props) => {
  return <div class={`py-2 flex flex-row space-x-2 w-full ${props.class}`}>{props.children}</div>;
};

export default Row;
