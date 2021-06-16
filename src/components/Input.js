const Input = ({ type, name, onChange, isChecked, focus, placeholder }) => {
  return (
    <>
      <input
        type={type}
        value={name}
        onChange={onChange}
        checked={isChecked}
        autoFocus={focus}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
