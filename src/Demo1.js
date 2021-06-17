const Demo1 = ({ id, name, age }) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <strong>
        <div>{id}</div>
      </strong>
      <div>{name}</div>
      <div>{age}</div>
      <br />
    </div>
  );
};

export default Demo1;
