import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

import StoreContext from '../../StoreContext';

import './Posts.css';

export default class Posts extends React.Component {
    static contextType = StoreContext;

    state = {
        posts: [],
        content: ''
    };

    componentDidMount(){
        this.fetchPosts();
    }

    fetchPosts = () => {
        fetch(config.API_ENDPOINT + `/api/posts/${this.context.currentForum}`)
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(resJson => {
                this.setState({
                    posts: resJson
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

    handleRemovePost = id => {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const myHeaders = new Headers();
        myHeaders.append('Cookies', cookie);

        fetch(config.API_ENDPOINT + `/api/posts/remove_post/${id}`, { method: 'DELETE', headers: myHeaders })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
            })
            .then(() => {
                this.fetchPosts();
            })
            .catch(err => {
                console.log(err);
                alert('You must be logged in!');
            })        
    }

    handleNewPostSubmit = e => {
        e.preventDefault();

        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', "application/json");
        myHeaders.append('Cookies', cookie);
        const newPost = JSON.stringify({
            user_id: this.context.userId,
            forum_id: this.context.currentForum,
            content: this.state.content,
            time_submitted: this.getCurrentTime()
        });

        fetch(config.API_ENDPOINT + `/api/posts/${this.context.currentForum}`, { method: 'POST', body: newPost, headers: myHeaders })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                this.fetchPosts();
            })
            .catch(err => {
                console.log(err);
                alert('You must be logged in!');
            })
        
        this.setState({
            content: ''
        })
    }

    handleContentChange = e => {
        this.setState({
            content: e.target.value
        });
    }

    getForumName = () => {
        let forum = this.context.forums.find(forum => forum.id === this.context.currentForum);

        return forum.title;
    }

    renderPosts = () => {
        let forumPosts = this.state.posts.filter(post => post.forum_id === this.context.currentForum);

        return forumPosts.map(post => 
            <li 
                key={post.id}
                className='post'
            >
                <button
                    className='delete-post'
                    onClick={() => this.handleRemovePost(post.id)}
                >
                    delete
                </button>
                <h3>{post.user_name}</h3>
                <p>{post.content}</p>
                <span>{post.time_submitted}</span>
            </li>
        )
    }

    render(){
        return(
            <div className='Posts'>
                <h2 className='Forum-name'>{this.getForumName()}</h2>
                <ul className='Posts-list'>
                    { this.renderPosts() }
                    <li className='new-post'>
                        <form 
                            className='new-post-form'
                            id='new-post-form'
                            onSubmit={this.handleNewPostSubmit}
                        >                            
                            <label htmlFor='new-post-content'>New Post</label>
                            <input 
                                className='new-post-content' 
                                onChange={this.handleContentChange}
                                value={this.state.content}
                            />
                            
                            <button 
                                className='new-post-button' 
                                type='submit'
                            >
                                submit
                            </button>
                        </form>
                    </li>
                </ul>
                <Link 
                    className='back-to-forums-button'
                    to={'/forums'}
                >
                    Forums
                </Link>
            </div>
        );
    };
};