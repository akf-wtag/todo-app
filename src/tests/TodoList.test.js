import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../components/TodoList';

Enzyme.configure({ adapter: new Adapter() });

const todos = [{ name: 'name', checked: false, id: null }];
test('TodoList receives todos prop correctly', () => {
  const wrapper = mount(<TodoList todos={todos} />);
  expect(wrapper.props().todos).toEqual(todos);
});

// test('TodoList calls onChangeTodos prop correctly', () => {
//   const mockfn = jest.fn();
//   const wrapper = mount(<TodoList onChangeTodos={mockfn} />);
//   expect(wrapper.find('Todo').props().onChangeTodos).toEqual(mockfn);
// });
