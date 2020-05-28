import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Register from './Register';

describe('YOUR_COMONENT_NAME component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Register />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI correctly', () => {
        expect(
        renderer.create(<Register />).toJSON()
        ).toMatchSnapshot();
    });
});