import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../components/Input';

Enzyme.configure({ adapter: new Adapter() });

test('Input receives type prop correctly', () => {
  const wrapper = mount(<Input type='ab' />);
  expect(wrapper.find('input').props().type).toEqual('ab');
});

test('Input receives name prop correctly', () => {
  const wrapper = mount(<Input name='ab' />);
  expect(wrapper.find('input').props().value).toEqual('ab');
});

test('Input calls onChange prop on input onChange event', () => {
  const mockfn = jest.fn();
  const wrapper = mount(<Input onChange={mockfn} />);
  wrapper.find('input').simulate('change');
  expect(mockfn).toHaveBeenCalled();
});

test('Input receives isChecked prop correctly', () => {
  const wrapper = mount(<Input isChecked={false} />);
  expect(wrapper.find('input').props().isChecked).toBeFalsy;
});

test('Input receives focus prop correctly', () => {
  const wrapper = mount(<Input focus={false} />);
  expect(wrapper.find('input').props().autoFocus).toBeFalsy;
});

test('Input receives placeholder prop correctly', () => {
  const wrapper = mount(<Input placeholder='ab' />);
  expect(wrapper.find('input').props().placeholder).toEqual('ab');
});

test('Input receives type prop correctly', () => {
  const wrapper = mount(<Input type='ab' />);
  expect(wrapper.find('input').props().className).toEqual('ab');
});
