import React from 'react';
import a from './MyPosts.module.css';
import Posts from './Posts/Posts';
import { useForm } from 'react-hook-form';


const MyPosts = React.memo(props => {
  console.log("render")
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()


  let postsElements = props.profilePage.postsData.map(p => <Posts Message={p.text} likeCount={p.likesCount} />)

  let newPostElement = React.createRef();


  const onSubmit = (data) => {
    console.log('Данные:', data)
    if (data.posts.trim()) {
      props.addPost(data.posts)
      reset()
    } else {
      reset()
    }
  }

  return (
    
    <div className={`${a.item} ${a.active}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={a.parentcontainer}>
          <textarea
            {...register('posts', { required: 'Пост не может быть пустым' })}
            placeholder='Введите новый пост...'
            className={a.textarea} />
        </div>
        <div className={a.parentcontainer}>
          <button type='submit' className={a.btn}> Add POST </button>
          <button type='submit' className={a.btn}>Remove</button>
        </div>
      </form>

      <div className={a.posts}>
        {postsElements}
      </div >
    </div>
  )
}
)



export default MyPosts;