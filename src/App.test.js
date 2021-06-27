import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

test('App renderes correctly', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('App')).toHaveLength(1);
});
