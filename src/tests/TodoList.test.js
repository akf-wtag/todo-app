import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../components/TodoList';

Enzyme.configure({ adapter: new Adapter() });

const todos = [{ name: 'name', checked: false, id: null }];

test('TodoList receives todos prop correctly', () => {
  const wrapper = mount(<TodoList todos={todos} />);
  expect(wrapper.find('ul').props().className).toEqual('todo-container');
});

// test('TodoList calls onChangeTodos prop correctly', () => {
//   const mockfn = jest.fn();
//   const wrapper = mount(<TodoList todos={todos} onChangeTodos={mockfn} />);
//   expect(wrapper.find('Todo').props().onChangeTodos).toEqual(mockfn);
// });

test('TodoList receives todosTitle prop correctly', () => {
  const wrapper = mount(<TodoList todosTitle='ab' />);
  expect(wrapper.find('h2').text()).toEqual('ab');
});

test('TodoList receives todoIdToCheck prop correctly', () => {
  const wrapper = mount(<TodoList id={1} todoIdToCheck={1} />);
  expect(wrapper.find('Todo').props().isChecking).toBeTruthy;
});

test('TodoList receives todoIdToDelete prop correctly', () => {
  const wrapper = mount(<TodoList id={1} todoIdToDelete={1} />);
  expect(wrapper.find('Todo').props().isDeleting).toBeTruthy;
});

test('TodoList receives todoIdToCheck prop correctly', () => {
  const wrapper = mount(<TodoList id={1} todoIdToDelete={1} />);
  expect(wrapper.find('Todo').props().isDeleting).toBeTruthy;
});
