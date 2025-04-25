import React from 'react';
import ProfileInfo from './ProfileInfo/PorfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { Navigate } from 'react-router-dom';

const Profile = (props) => {
  
  if (!props.isAuth) {
    return <Navigate to ="/login" replace />
  } 
    
  return <div>
    <ProfileInfo
        savePhoto = {props.savePhoto}
        owner = {props.owner}
        profile = {props.profile}
        updateStatus ={props.updateStatus} />
    <MyPostsContainer />

  </div>
}


export default Profile;