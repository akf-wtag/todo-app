import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from '../components/Todo';

Enzyme.configure({ adapter: new Adapter() });

// test('Todo receives id prop correctly', () => {
//   const mockfn = jest.fn();
//   const wrapper = mount(<Todo isEditing={true} onChangeTodos={mockfn} />);
//   wrapper
//     .find('FaRegSave')
//     .simulate('click', { target: { id: 1, newName: 'ab', checked: false } });
//   expect(mockfn).toHaveBeenCalledWith(1, 'ab', false);
// });

test('Todo receives name prop correctly', () => {
  const wrapper = mount(<Todo checked={false} isEditing={false} name='ab' />);
  expect(wrapper.find('.todo-name').text()).toEqual('ab');
});

test('Todo receives checked prop correctly', () => {
  const wrapper = mount(<Todo isEditing={false} checked={true} />);
  expect(wrapper.find('.todo-completed').props().className).toEqual(
    'todo-completed'
  );
});

test('Todo receives isEditing prop correctly', () => {
  const wrapper = mount(<Todo isEditing={true} />);
  expect(wrapper.find('FaRegSave')).toHaveLength(1);
});

test('Todo receives isChecking prop correctly', () => {
  const wrapper = mount(<Todo isChecking={true} />);
  expect(wrapper.find('.check-loading')).toHaveLength(1);
});

test('Todo receives isDeleting prop correctly', () => {
  const wrapper = mount(<Todo isDeleting={false} />);
  expect(wrapper.find('FaTrash')).toHaveLength(1);
});

// expect(wrapper.find('.input-container').children().length).toBe(3);
