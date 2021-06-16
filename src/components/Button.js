const Button = ({ name, onClick, btnName }) => {
  return (
    <>
      <button
        type='button'
        onClick={() => onClick(Math.random() * 1000, name, false)}
      >
        {btnName}
      </button>
    </>
  );
};

export default Button;
