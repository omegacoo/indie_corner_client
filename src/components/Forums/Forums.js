import React from 'react';

import './Forums.css';

import FakeStore from '../../fakeStore';

export default class Forums extends React.Component {

    renderList = () => {
        return FakeStore.fakeForums.map(forum => 
                <li id={forum.id} className='forum'>
                    <h3>{forum.title}</h3>
                    <p>{forum.blurb}</p>
                </li>
        )
    }

    render(){
        return(
            <div className='Forums'>
                <ul className='Forums-list'>
                    { this.renderList() }
                </ul>
            </div>
        );
    };
};