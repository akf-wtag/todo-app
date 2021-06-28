import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from '../components/Todo';

Enzyme.configure({ adapter: new Adapter() });

// const todo = { todoTitle: [{ name: 'ab', checked: false, id: '1' }], id: '2' };
// const incompletedTodos = [{ name: 'ab', checked: false, id: '1' }];

// test('Card receives itemId prop correctly', () => {
//   const wrapper = mount(<CardItem itemId={1} />);
//   expect(wrapper.find('').).toEqual('');
// });

test('Card receives name prop correctly', () => {
  const wrapper = mount(
    <Todo name='ab' checked={false} isSaving={false} isEditing={false} />
  );
  expect(wrapper.find('.item-name').text()).toEqual('ab');
});

test('Card receives checked prop correctly', () => {
  const wrapper = mount(<Todo isChecking={false} checked={false} />);
  expect(wrapper.find('Input').props().isChecked).toBeFalsy();
});
