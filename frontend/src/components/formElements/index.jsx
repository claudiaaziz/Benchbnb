export const Input = ({ label, type = "text", ...inputProps }) => {
  return (
    <label>
      {label}
      <input type={type} {...inputProps} />
    </label>
  );
}

export const TextArea = ({ label, ...inputProps }) => {
  return (
    <label>
      {label}
      <textarea {...inputProps} />
    </label>
  );
}

export const FormErrors = ({ errors }) => {
  return (
    errors.length > 0 &&
    <ul className="errors">
      {errors.map(error => <li key={error}>{error}</li>)}
    </ul>
  );
}
