import PropTypes from 'prop-types';

const Button = ({ onClick, btnName, className }) => {
  return (
    <button type='button' className={className} onClick={onClick}>
      {btnName}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  btnName: '',
  className: '',
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  btnName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
