import PropTypes from 'prop-types';

const Button = ({ type, btnName, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {btnName}
    </button>
  );
};

Button.defaultProps = {
  type: '',
  btnName: '',
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
