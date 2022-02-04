export function Screen(props: { width: number; height: number }) {
  const style = { height: props.height, width: props.width };
  return (
    <div className="bg-gray-500 rounded border-cyan-600 border-2" style={style}>
      screen
    </div>
  );
}
