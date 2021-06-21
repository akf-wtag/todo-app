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
        placeholder={placeholder}
        value={name}
        onChange={onChange}
        checked={isChecked}
        autoFocus={focus}
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
  placeholder: '',
  name: '',
  onChange: () => {},
  isChecked: false,
  focus: false,
  onKeyPress: () => {},
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  focus: PropTypes.bool.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

export default Input;
