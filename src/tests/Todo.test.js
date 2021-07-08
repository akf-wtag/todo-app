import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from '../components/Todo';

Enzyme.configure({ adapter: new Adapter() });

test('Todo receives todoName prop correctly', () => {
  const wrapper = shallow(<Todo todoName='ab' />);
  expect(wrapper.find('.todo-check').props().label).toEqual('ab');
});

test('Todo receives checked prop correctly', () => {
  const wrapper = shallow(<Todo checked={false} />);
  expect(wrapper.find('.todo-check').props().isChecked).toBeFalsy();
});

test('Todo receives checkUpdate prop correctly', () => {
  const a = (todoId, checked) => {};
  const b = (fn) => fn('2', false);
  const mockfn = jest.fn(a);
  b(mockfn);
  const wrapper = shallow(<Todo checkUpdate={mockfn} />);
  wrapper.find('.todo-check').simulate('change');
  expect(mockfn).toHaveBeenCalledWith('2', false);
});

test('Todo receives deleteTodo prop correctly', () => {
  const mockfn = jest.fn((todoId) => {});
  const wrapper = shallow(<Todo deleteTodo={mockfn('2')} />);
  wrapper.find('.delete-icon-btn').simulate('click');
  expect(mockfn).toHaveBeenCalledWith('2');
});

test('Todo receives todoNameUpdate prop correctly', () => {
  const fn = () => {};
  const mockfn = jest.fn((todoId, editedTodoName, fn) => {});
  const wrapper = shallow(<Todo todoNameUpdate={mockfn('2', 'ab', fn)} />);
  wrapper.find('.edit-icon-btn').simulate('click');
  wrapper.find('.save-icon-btn').simulate('click');
  expect(mockfn).toHaveBeenCalledWith('2', 'ab', fn);
});
