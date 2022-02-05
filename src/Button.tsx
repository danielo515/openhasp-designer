interface ButtonProps {
  label: string;
}

export function Button(p: ButtonProps) {
  return <button class="btn btn-primary">{p.label}</button>;
}
