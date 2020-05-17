import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI correctly', () => {
        expect(
            renderer.create(
                <BrowserRouter>
                    <Header />
                </BrowserRouter>).toJSON()
        ).toMatchSnapshot();
    });
});