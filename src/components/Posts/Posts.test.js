import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Posts from './Posts';

describe('Posts component', () => {
    let context = {
        currentForum: 1,
        currentUser: 'anonymous'
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <Posts context={context}/>
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI correctly', () => {
        expect(
            renderer.create(
                <BrowserRouter>
                    <Posts context={context}/>
                </BrowserRouter>
            ).toJSON()
        ).toMatchSnapshot();
    });
});