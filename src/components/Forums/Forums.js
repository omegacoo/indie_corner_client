import React from 'react';
import config from '../../config';

import StoreContext from '../../StoreContext';

import './Forums.css';

export default class Forums extends React.Component {
    static contextType = StoreContext;

    state = {
        title: 'Title...',
        blurb: 'Description...',
        user: 'anonymous',
        content: ''
    };

    handleRemoveForum = id => {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const myHeaders = new Headers();
        myHeaders.append('Cookies', cookie);

        fetch(config.API_ENDPOINT + `/api/forums/remove_forum/${id}`, { method: 'DELETE', headers: myHeaders })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
            })
            .then(() => {
                this.context.fetchForums();
            })
            .catch(err => {
                console.log(err);
                alert('You must be logged in!');
            })
    }

    handleNewForumSubmit = e => {
        e.preventDefault();

        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', "application/json");
        myHeaders.append('Cookies', cookie);
        const myBody = JSON.stringify({ 'title': this.state.title, 'blurb': this.state.blurb });

        fetch(config.API_ENDPOINT + `/api/forums`, { method: 'POST', body: myBody, headers: myHeaders })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                this.context.fetchForums();
            })
            .catch(err => {
                console.log(err);
            })
        
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
        this.props.history.push(`/posts/${id}`);
    }

    clearText = e => {
        e.target.value = '';
    }

    resetText = e => {
        if(e.target.value === ''){
            if(e.target.className === 'new-forum-title'){
                e.target.value = this.state.title;
            } else {
                e.target.value = this.state.blurb;
            }
        }
    }

    renderList = () => {
        return this.context.forums.map(forum => 
                <li 
                    key={forum.id} 
                    className='forum'
                    onClick={e => this.handleForumClick(e, forum.id)}
                >
                    { this.context.loggedIn ? <button 
                            className='delete-forum'
                            onClick={() => this.handleRemoveForum(forum.id)}
                        >
                            delete
                        </button>
                        : null }
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
                    { this.context.loggedIn ?
                        <li className='new-forum'>
                            <form 
                                className='new-forum-form'
                                onSubmit={this.handleNewForumSubmit}
                            >
                                    <div className='new-forum-header'>New Forum</div>
                                    <input 
                                        className='new-forum-title' 
                                        onChange={this.handleTitleChange}
                                        value={this.state.title}
                                        onFocus={ this.clearText }
                                        onBlur={ this.resetText }
                                    />
                                    
                                    <input 
                                        className='new-forum-blurb' 
                                        onChange={this.handleBlurbChange}
                                        value={this.state.blurb}
                                        onFocus={ this.clearText }
                                        onBlur={ this.resetText }
                                    />
                                    
                                    <button 
                                        className='new-forum-button' 
                                        type='submit'
                                    >
                                        submit
                                    </button>
                            </form>
                        </li>
                        : null
                    }
                </ul>
            </div>
        );
    };
};