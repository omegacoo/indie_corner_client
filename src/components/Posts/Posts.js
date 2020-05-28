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
        
    }

    handleNewPostSubmit = e => {
        e.preventDefault();

        let newPost = {
            user: this.context.currentUser,
            content: this.state.content,
            time: this.getCurrentTime(),
            id: Math.floor(Math.random() * Math.floor(1000000))
        };
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
        let forumPosts = this.state.posts.filter(post => post.id !== this.context.currentForum);

        return forumPosts.map(post => 
            <li 
                key={post.id}
                className='post'
            >
                <button
                    className='delete-post'
                    onClick={() => this.handleRemovePost(post.id)}
                >
                    X
                </button>
                <h3>{post.user}</h3>
                <span>{post.time}</span>
                <p>{post.content}</p>
            </li>
        )
    }

    render(){
        return(
            <div className='Posts'>
                <h2 className='Forum-name'>{this.getForumName()}</h2>
                <ul className='Posts-list'>
                    {this.renderPosts()}
                    <li className='new-post'>
                        <form 
                            className='new-post-form'
                            onSubmit={this.handleNewPostSubmit}
                        >                            
                            <label htmlFor='new-post-content'>Post</label>
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