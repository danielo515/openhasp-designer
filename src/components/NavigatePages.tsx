import { Component } from "solid-js";

const Arrow = (p: { direction: "left" | "right" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="inline-block w-6 h-6 stroke-current"
    style={`${p.direction === "left" ? "transform: rotate(180deg)" : ""}`}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    ></path>
  </svg>
);

interface NavigatePagesProps {
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
}

export const NavigatePages: Component<NavigatePagesProps> = (p) => {
  return (
    <div class="flex space-x-4">
      <button class="btn" onClick={p.onPrev}>
        <Arrow direction="left" />
      </button>
      <div class="flex p-2 justify-center items-center">
        <p>{p.currentPage}</p>
      </div>
      <button class="btn" onClick={p.onNext}>
        <Arrow direction="right" />
      </button>
    </div>
  );
};
