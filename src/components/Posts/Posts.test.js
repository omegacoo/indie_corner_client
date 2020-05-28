import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import StoreContext from '../../StoreContext';
import Posts from './Posts';

describe('Posts component', () => {
    let contextValue = {
        currentForum: 1,
        currentUser: 'anonymous',
        forums: [
            {
                id: 1,
                title: 'test forum'
            },
            {
                id: 0,
                title: 'test forum'
            },
            {
                id: 2,
                title: 'test forum'
            },
        ]
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <StoreContext.Provider value={contextValue}>
                    <Posts />
                </StoreContext.Provider>
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI correctly', () => {
        expect(
            renderer.create(
                <BrowserRouter>
                    <StoreContext.Provider value={contextValue}>
                        <Posts />
                    </StoreContext.Provider>
                </BrowserRouter>
            ).toJSON()
        ).toMatchSnapshot();
    });
});