import PropTypes from 'prop-types';

const Button = ({ name, onClick, btnName }) => {
  return (
    <>
      <button
        type='button'
        className={btnName}
        onClick={() => onClick(Math.random() * 1000, name, false)}
      >
        {btnName}
      </button>
    </>
  );
};

Button.defaultProps = {
  name: '',
  onClick: () => {},
  btnName: '',
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  btnName: PropTypes.string.isRequired,
};

export default Button;
