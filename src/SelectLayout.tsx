export default function SelectLayout({ setLayout, layout }) {
  return (
    <select
      value={layout().tag}
      class="select"
      onChange={(e) => {
        console.log(e.currentTarget.value);

        if (e.currentTarget.value === "horizontal") {
          setLayout("horizontal");
        } else {
          setLayout("vertical");
        }
      }}
    >
      <option value="vertical">Vertical</option>
      <option value="horizontal">Horizontal</option>
    </select>
  );
}
