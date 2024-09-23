function Slider({ label, value, min, max, step, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 font-medium">
        {label}: {value}
      </label>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Slider;