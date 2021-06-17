import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../components/Button';

Enzyme.configure({ adapter: new Adapter() });

test('Button calls onClick prop correctly', () => {
  const mockfn = jest.fn();
  const wrapper = mount(<Button onClick={mockfn} />);
  wrapper.find('button').simulate('click');
  expect(mockfn).toHaveBeenCalled();
});

test('Button receives btnName prop correctly', () => {
  const wrapper = mount(<Button btnName='ab' />);
  expect(wrapper.find('button').text()).toEqual('ab');
});
