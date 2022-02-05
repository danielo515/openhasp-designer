import { ComponentProps } from "solid-js";

interface Props extends ComponentProps<"div"> {
  width: number;
  height: number;
}

export function Screen(props: Props) {
  const style = () => `height: ${props.height}px; width: ${props.width}px;`;
  return (
    <div
      class="bg-gray-500 rounded border-cyan-600 border-2 relative shadow-md"
      style={style()}
    >
      {props.children}
    </div>
  );
}
