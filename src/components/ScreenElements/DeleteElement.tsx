export function DeleteElement(p) {
  return (
    <button
      class="btn btn-error btn-xs btn-circle absolute  -top-4 -right-4 z-1 text-white"
      onClick={p.onClick}
    >
      X
    </button>
  );
}
