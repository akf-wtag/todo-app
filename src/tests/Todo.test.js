import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from '../components/Todo';

Enzyme.configure({ adapter: new Adapter() });

test('Todo receives id & onEdit prop correctly', () => {
  const mockfn1 = jest.fn();
  // const mockfn2 = jest.fn();
  const wrapper = mount(
    <Todo
      isEditing={false}
      id={1}
      // name='ab'
      onEdit={mockfn1}
      // setNewName={mockfn2}
    />
  );
  wrapper.find('FaEdit').simulate('click');
  expect(mockfn1).toHaveBeenCalledWith(1);

  // expect(mockfn2).toHaveBeenCalledWith('ab');
});

test('Todo receives name prop correctly', () => {
  const wrapper = mount(
    <Todo isEditing={false} isSaving={true} checked={false} name='ab' />
  );
  expect(wrapper.find('.todo-name').text()).toEqual('ab');
});

test('Todo receives checked prop correctly', () => {
  const wrapper = mount(
    <Todo isEditing={false} isSaving={false} checked={true} />
  );
  expect(wrapper.find('.todo-completed').props().className).toEqual(
    'todo-completed'
  );
});

test('Todo receives isEditing prop correctly', () => {
  const wrapper = mount(<Todo isEditing={true} />);
  expect(wrapper.find('FaRegSave')).toHaveLength(1);
});

// test('Todo receives updatedTodos prop correctly', () => {
//   // async function test
// });

test('Todo receives onEditCancel prop correctly', () => {
  const mockfn = jest.fn();
  const wrapper = mount(<Todo isEditing={true} onEditCancel={mockfn} />);
  wrapper.find('ImCancelCircle').simulate('click');
  expect(mockfn).toHaveBeenCalled();
});

// expect(wrapper.find('.input-container').children().length).toBe(3);
