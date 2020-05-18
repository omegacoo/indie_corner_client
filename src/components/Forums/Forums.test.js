import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Forums from './Forums';

describe('Forums component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <Forums />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI correctly', () => {
        expect(
            renderer.create(
                <BrowserRouter>
                    <Forums />
                </BrowserRouter>
            ).toJSON()
        ).toMatchSnapshot();
    });
});