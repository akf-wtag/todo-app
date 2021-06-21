import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../components/TodoList';

Enzyme.configure({ adapter: new Adapter() });

const todos = [{ name: 'name', checked: false, id: null }];

test('TodoList receives todos prop correctly', () => {
  const wrapper = mount(<TodoList todos={todos} />);
  expect(wrapper.find('ul').props().className).toEqual('todo-container');
});

test('TodoList receives todosTitle prop correctly', () => {
  const wrapper = mount(<TodoList todosTitle='ab' />);
  expect(wrapper.find('h2').text()).toEqual('ab');
});
