import React from 'react';
import a from './Posts.module.css';

const   Posts = (props) => {
  return (
    <div>
      <div className={a.active}>
        <img src='https://i.pinimg.com/originals/5f/a0/d6/5fa0d60a2e9e8ea2abb7af6c446c035a.jpg'></img>
        <span>{props.Message} </span>
        <div>
          <button>Like</button> {props.likeCount}
        </div>
      </div>

    </div>
  )
}


export default Posts;