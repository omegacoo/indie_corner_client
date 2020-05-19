import React from 'react';

import './Forums.css';

import FakeStore from '../../fakeStore';

export default class Forums extends React.Component {
    state = {
        forums: FakeStore.fakeForums,
        title: '',
        blurb: ''
    };

    handleRemoveForum = id => {
        let newForums = this.state.forums.filter(forum => forum.id !== id);

        this.setState({
            forums: newForums
        });
    }

    handleNewForumSubmit = e => {
        e.preventDefault();

        let newForums = this.state.forums;
        let newForum = {
            title: this.state.title,
            blurb: this.state.blurb,
            id: Math.floor(Math.random() * Math.floor(1000000))
        };

        newForums.push(newForum);
        
        this.setState({
            title: '',
            blurb: ''
        });
    }

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    }

    handleBlurbChange = e => {
        this.setState({
            blurb: e.target.value
        });
    }

    renderList = () => {
        return this.state.forums.map(forum => 
                <li key={forum.id} className='forum'>
                    <button 
                        className='delete-forum'
                        onClick={() => this.handleRemoveForum(forum.id)}
                    >
                        X
                    </button>
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
                    <li className='new-forum'>
                        <form 
                            className='new-forum-form'
                            onSubmit={this.handleNewForumSubmit}
                        >
                            <label htmlFor='new-forum-title'>Title</label>
                            <input 
                                className='new-forum-title' 
                                onChange={this.handleTitleChange}
                                value={this.state.title}
                            />
                            
                            <label htmlFor='new-forum-blurb'>Description</label>
                            <input 
                                className='new-forum-blurb' 
                                onChange={this.handleBlurbChange}
                                value={this.state.blurb}
                            />
                            
                            <button 
                                className='new-forum-button' 
                                type='submit'
                            >
                                submit
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        );
    };
};