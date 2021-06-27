import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from '../components/Card';

Enzyme.configure({ adapter: new Adapter() });

const todo = { todoTitle: [{ name: 'ab', checked: false, id: 'a' }], id: 'b' };
const incompletedTodos = [{ name: 'ab', checked: false, id: 'c' }];

test('Card receives todo prop correctly', () => {
  const wrapper = mount(<Card todo={todo} />);
  expect(wrapper.find('.grid-title').text()).toEqual('todoTitle');
});

test('Card receives search prop correctly', () => {
  const wrapper = mount(
    <Card searchText='ab' todo={todo} incompletedTodos={incompletedTodos} />
  );
  expect(wrapper.find('.list-container')).toHaveLength(1);
});
