import { CommonHaspProps } from "../../openHasp";

export function makeStyles(p: CommonHaspProps) {
  const borderSides = {
    0: [] as string[],
    1: ["bottom"],
    2: ["top"],
    3: ["top", "bottom"],
    4: ["left"],
    5: ["left", "bottom"],
    6: ["left", "top"],
    8: ["right"],
    15: ["right", "left", "top", "bottom"],
  };
  return () => `
    top: ${p.y}px; 
    left: ${p.x}px; 
    width: ${p.w}px; 
    height: ${p.h}px;
    color: ${p.text_color};
    border-radius: ${p.radius}px;
    ${p.border_side ?? `border-width: ${p.border_width}px;`}
    border-color: ${p.border_color};
    background-color: ${p.bg_color};
    background-image: linear-gradient(${p.bg_color} 0%, ${p.bg_grad_color} 100%);
    ${borderSides[p.border_side ?? 0]
      .map((side) => `border-${side}-width: ${p.border_width}px;`)
      .join("\n")}
    `;
}
