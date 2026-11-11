export default function Input({
  label, type = "text", name, error, className = "", ...props
}) {
  return (
    <label className={`field ${className}`.trim()}>
      {label && <span className="field-label">{label}</span>}
      <input className="glass-input" type={type} name={name} id={name} {...props} />
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}