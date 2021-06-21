import PropTypes from 'prop-types';

const Input = ({
  type,
  placeholder,
  name,
  onChange,
  isChecked,
  focus,
  onKeyPress,
}) => {
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
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onKeyPress();
          }
        }}
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
  onKeyPress: () => {},
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  focus: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

export default Input;
