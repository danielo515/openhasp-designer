import { Component } from "solid-js";

interface ScreenButtonProps {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  radius: number;
}

export const ScreenButton: Component<ScreenButtonProps> = (p) => {
  const styles = () => `
    top: ${p.y}px; 
    left: ${p.x}px; 
    width: ${p.w}px; 
    height: ${p.h}px;
    border-radius: ${p.radius}px;
    `;
  return (
    <div class="hasp-button" style={styles()}>
      {p.text}
    </div>
  );
};
