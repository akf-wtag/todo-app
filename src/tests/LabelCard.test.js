import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LabelCard from '../components/LabelCard';

Enzyme.configure({ adapter: new Adapter() });

const todos = [{ name: 'ab', checked: false, id: '1', labelId: '2' }];

test('LabelCard receives labelId prop correctly', () => {
  const wrapper = shallow(
    <LabelCard todos={todos} labelId='2' searchText='ab' />
  );
  expect(wrapper.find('.todo-title-text').text()).toEqual('Incomplete');
});

test('LabelCard receives labelName prop correctly', () => {
  const wrapper = shallow(<LabelCard labelName='ab' />);
  expect(wrapper.find('.single-card-container').props().title).toEqual('ab');
});

test('LabelCard receives todos prop correctly', () => {
  const wrapper = shallow(
    <LabelCard todos={todos} labelId='2' searchText='ab' />
  );
  expect(wrapper.find('.todo-title-text').text()).toEqual('Incomplete');
});

test('LabelCard receives searchText prop correctly', () => {
  const wrapper = shallow(
    <LabelCard todos={todos} labelId='2' searchText='ab' />
  );
  expect(wrapper.find('.todo-title-text').text()).toEqual('Incomplete');
});

test('LabelCard calls postTodo prop correctly', () => {
  const mockfn = jest.fn();
  const wrapper = shallow(<LabelCard postTodo={mockfn} />);
  wrapper.find('.todo-add-btn').simulate('click');
  wrapper.find('.save-icon-btn').simulate('click');
  expect(mockfn).toHaveBeenCalled();
});

test('LabelCard calls checkUpdate prop correctly', () => {
  const mockfn = jest.fn();
  const wrapper = mount(
    <LabelCard todos={todos} labelId='2' searchText='ab' checkUpdate={mockfn} />
  );
  wrapper.find('Todo').props().checkUpdate();
  expect(mockfn).toHaveBeenCalled();
});

test('LabelCard calls checkUpdate prop correctly', () => {
  const mockfn = jest.fn();
  const wrapper = mount(
    <LabelCard todos={todos} labelId='2' searchText='ab' deleteTodo={mockfn} />
  );
  wrapper.find('Todo').props().deleteTodo();
  expect(mockfn).toHaveBeenCalled();
});

test('LabelCard calls checkUpdate prop correctly', () => {
  const mockfn = jest.fn();
  const wrapper = mount(
    <LabelCard
      todos={todos}
      labelId='2'
      searchText='ab'
      todoNameUpdate={mockfn}
    />
  );
  wrapper.find('Todo').props().todoNameUpdate();
  expect(mockfn).toHaveBeenCalled();
});
