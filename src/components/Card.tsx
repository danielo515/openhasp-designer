import { Component } from "solid-js";

interface CardProps {
  class?: string;
  layout: "row" | "column";
  borders?: {
    top?: boolean;
    bottom?: boolean;
  };
}

export const Card: Component<CardProps> = (p) => {
  return (
    <div
      class={`border-2 border-base-200 flex relative ${p.class ?? ""}`}
      classList={{
        "flex-row": p.layout === "row",
        "flex-col": p.layout === "column",
        "border-t-0": p.borders?.top === false,
        "border-b-0": p.borders?.bottom === false,
      }}
    >
      {p.children}
    </div>
  );
};

export const CardContent: Component = (p) => {
  return <div class="flex-1">{p.children}</div>;
};

export const CardHeader: Component = (p) => {
  return <div class="bg-base-200 p-2 pb-0">{p.children}</div>;
};
