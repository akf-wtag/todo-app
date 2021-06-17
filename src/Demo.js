import Demo1 from './Demo1';

const Demo = ({ tours }) => {
  return (
    <div>
      {tours &&
        tours.map((tour) => {
          return <Demo1 key={tour.id} {...tour} />;
        })}
    </div>
  );
};

export default Demo;
