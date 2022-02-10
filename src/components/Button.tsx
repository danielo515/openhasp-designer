interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  onClick: () => void;
}

export function Button(p: ButtonProps) {
  const classList = {
    "btn-primary": p.variant === "primary",
    "btn-outline": p.variant === "default",
  };
  return (
    <button class="btn" classList={classList} onClick={p.onClick}>
      {p.label}
    </button>
  );
}
