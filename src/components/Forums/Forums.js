import React from 'react';
import config from '../../config';

import StoreContext from '../../StoreContext';

import './Forums.css';

export default class Forums extends React.Component {
    static contextType = StoreContext;

    state = {
        forums: [],
        title: '',
        blurb: '',
        user: 'anonymous',
        content: ''
    };

    componentDidMount(){
        this.fetchForums();
    }

    fetchForums = () => {
        fetch(config.API_ENDPOINT + '/api/forums')
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(resJson => {
                this.setState({
                    forums: resJson
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    getCurrentTime(){
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let dateTime = date + ' ' + time;
    
        return dateTime;
    }

    handleRemoveForum = id => {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const myHeaders = new Headers();
        myHeaders.append('Cookies', cookie);

        fetch(config.API_ENDPOINT + `/api/forums/remove_forum/${id}`, { method: 'DELETE', headers: myHeaders })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                this.fetchForums();
            })
            .catch(err => {
                console.log(err);
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
                this.fetchForums();
            })
            .catch(err => {
                console.log(err);
                alert('You must be logged in to add forums!');
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