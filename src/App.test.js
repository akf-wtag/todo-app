import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getTodos } from './App';

Enzyme.configure({ adapter: new Adapter() });
