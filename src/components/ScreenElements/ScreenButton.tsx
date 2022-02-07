import { Component } from "solid-js";

interface ScreenButtonProps {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
}

export const ScreenButton: Component<ScreenButtonProps> = (p) => {
  const styles = () =>
    `top: ${p.y}px; 
    left: ${p.x}px; 
    width: ${p.w}px; 
    height: ${p.h}px;`;
  return (
    <div class="absolute" style={styles()}>
      {p.text}
    </div>
  );
};
