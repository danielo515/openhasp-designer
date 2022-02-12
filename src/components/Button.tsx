interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

export function Button(p: ButtonProps) {
  const classList = {
    "btn-primary": p.variant === "primary",
    "btn-outline": p.variant === "default",
    "btn-sm": p.size === "sm",
    "btn-md": p.size === "md",
    "btn-lg": p.size === "lg",
  };
  return (
    <button class="btn" classList={classList} onClick={p.onClick}>
      {p.label}
    </button>
  );
}
