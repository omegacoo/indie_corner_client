import React from 'react';

import StoreContext from '../../StoreContext';

import './Forums.css';

import FakeStore from '../../fakeStore';

export default class Forums extends React.Component {
    static contextType = StoreContext;

    state = {
        forums: FakeStore.fakeForums,
        title: '',
        blurb: '',
        user: 'anonymous',
        content: ''
    };

    getCurrentTime(){
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let dateTime = date + ' ' + time;
    
        return dateTime;
    }

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

    handleForumClick = (e, id) => {
        if(e.target.className === 'delete-forum'){
            return;
        }

        this.context.handleForumSelect(id);
        this.props.history.push('/posts');
    }

    renderList = () => {
        return this.state.forums.map(forum => 
                <li 
                    key={forum.id} 
                    className='forum'
                    onClick={e => this.handleForumClick(e, forum.id)}
                >
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