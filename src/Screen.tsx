import { createMemo } from "solid-js";

export function Screen(props: { width: number; height: number }) {
  const style = () => `height: ${props.height}px; width: ${props.width}px;`;
  return (
    <div
      class="bg-gray-500 rounded border-cyan-600 border-2 relative shadow-md"
      style={style()}
    >
      screen
    </div>
  );
}
