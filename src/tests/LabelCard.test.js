import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LabelCard from '../components/LabelCard';

Enzyme.configure({ adapter: new Adapter() });

const todos = [{ name: 'ab', checked: false, id: '1', labelId: '2' }];

// test('LabelCard receives labelId prop correctly', () => {
//   const wrapper = mount(<LabelCard labelId='2' />);
//   expect(wrapper.find('.single-card-container').key()).toEqual('ab');
// });

test('LabelCard receives labelName prop correctly', () => {
  const wrapper = shallow(<LabelCard labelName='ab' />);

  expect(wrapper.find('.label-name').text()).toEqual('ab');
});

test('LabelCard receives todos prop correctly', () => {
  const wrapper = shallow(
    <LabelCard todos={todos} labelId='2' searchText='a' />
  );
  console.log(wrapper.debug());
  expect(wrapper.find('#list-title').text()).toEqual('Incomplete');
});

// test('LabelCard receives searchText prop correctly', () => {
//   const wrapper = mount(
//     <LabelCard todos={todos} labelId='2' searchText='ab' />
//   );
//   expect(wrapper.find('.todo-title-text').text()).toEqual('Incomplete');
// });

// test('LabelCard calls postTodo prop correctly', () => {
//   const mockfn = jest.fn();
//   const wrapper = mount(
//     <LabelCard isAddingTodo={true} isPostingTodo={false} postTodo={mockfn} />
//   );
//   // console.log(wrapper.find('.save-icon').props());
//   wrapper.find('.save-icon').simulate('click');
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