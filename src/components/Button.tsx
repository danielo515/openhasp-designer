interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button(p: ButtonProps) {
  return (
    <button class="btn btn-primary" onClick={p.onClick}>
      {p.label}
    </button>
  );
}
