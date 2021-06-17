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
  const wrapper = mount(<Todo isEditing={false} name={'ab'} />);
  expect(wrapper.find('p').text()).toEqual('ab');
});

test('Todo receives checked prop correctly', () => {
  const wrapper = mount(<Todo isEditing={false} checked={true} />);
  expect(wrapper.find('p').props().className).toEqual('todo-completed');
});

test('Todo receives isEditing prop correctly', () => {
  const wrapper = shallow(<Todo isEditing={true} />);
  expect(wrapper.find('.input-container').children().length).toBe(3);
});
