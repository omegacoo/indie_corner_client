import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('renders UI correctly', () => {
        expect(
            renderer.create(
                <BrowserRouter>
                    <App />
                </BrowserRouter>).toJSON()
        ).toMatchSnapshot()
    })
})