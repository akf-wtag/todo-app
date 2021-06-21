import PropTypes from 'prop-types';

const Button = ({ name, onClick, btnName, className }) => {
  return (
    <button type='button' className={className} onClick={onClick}>
      {btnName}
    </button>
  );
};

Button.defaultProps = {
  name: '',
  onClick: () => {},
  btnName: '',
  className: '',
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  btnName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
