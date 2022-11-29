function Checkbox(props = {label, value, onChange }) {
  // { label, value, onChange } = props
  return (
    <label className="label">
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}

export default Checkbox;