import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import MainLanding from './MainLanding';

describe('MainLanding component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <MainLanding />
            </BrowserRouter>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI correctly', () => {
        expect(
        renderer.create(
            <BrowserRouter>
                <MainLanding />
            </BrowserRouter>).toJSON()
        ).toMatchSnapshot();
    });
});