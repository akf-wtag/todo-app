import PropTypes from 'prop-types';

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
        className={type}
      />
    </>
  );
};

Input.defaultProps = {
  type: '',
  name: '',
  onChange: () => {},
  isChecked: false,
  focus: false,
  placeholder: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  focus: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
