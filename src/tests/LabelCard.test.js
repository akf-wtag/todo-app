import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LabelCard from '../components/LabelCard';

Enzyme.configure({ adapter: new Adapter() });

const todos = [{ name: 'ab', checked: false, id: '1', labelId: '2' }];

test('LabelCard receives labelId prop correctly', () => {
  const wrapper = mount(<LabelCard labelId='ab' />);
  expect(wrapper.find('.single-card-container').key()).toEqual('ab');
});

test('LabelCard receives labelName prop correctly', () => {
  const wrapper = mount(<LabelCard labelName='ab' />);
  expect(wrapper.find('.card-label').text()).toEqual('ab');
});

test('LabelCard receives todos prop correctly', () => {
  const wrapper = mount(<LabelCard todos={todos} labelId='2' searchText='a' />);
  expect(wrapper.find('.todo-title-text').text()).toEqual('Incomplete');
});

test('LabelCard receives searchText prop correctly', () => {
  const wrapper = mount(
    <LabelCard todos={todos} labelId='2' searchText='ab' />
  );
  expect(wrapper.find('.todo-title-text').text()).toEqual('Incomplete');
});

// test('LabelCard calls onPostTodo prop correctly', () => {
//   const mockfn = jest.fn();
//   const wrapper = mount(
//     <LabelCard isAddingTodo={true} isPostingTodo={false} onPostTodo={mockfn} />
//   );
//   wrapper.find('FaRegSave').simulate('click');
//   expect(mockfn).toHaveBeenCalled();
// });

// test('LabelCard receives todo prop correctly', () => {
//   const wrapper = mount(<LabelCard todo={todo} />);
//   expect(wrapper.find('.grid-title').text()).toEqual('todoTitle');
// });

// test('LabelCard receives search prop correctly', () => {
//   const wrapper = mount(
//     <LabelCard
//       searchText='ab'
//       todo={todo}
//       incompletedTodos={incompletedTodos}
//     />
//   );
//   expect(wrapper.find('.list-container')).toHaveLength(1);
// });
