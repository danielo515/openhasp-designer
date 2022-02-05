import { createMemo } from "solid-js";

export function Screen(props: { width: number; height: number }) {
  const style = createMemo(
    () => `height: ${props.height}px; width: ${props.width}px;`
  );
  return (
    <div
      className="bg-gray-500 rounded border-cyan-600 border-2"
      style={style()}
    >
      screen
    </div>
  );
}
