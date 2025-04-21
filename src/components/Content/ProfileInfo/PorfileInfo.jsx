import React from 'react';
import a from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from './ProfileStatus';



const ProfileInfo = React.memo(props => {
  if (!props.profile) { 
    return <Preloader />
  }

  return (
    <div>
      <div>
        <img src={props.profile.photos.large}></img>
      </div>
      <div className={a.discript}>
        <img src={props.profile.photos.small}></img>
      </div>
      <div>
        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
      </div>
      <div>
        Contacts : 
        <div>VK: {props.profile.contacts.vk}</div>
        <div>FACEBOOK: {props.profile.contacts.facebook}</div>
        <div>GITHUB: {props.profile.contacts.github}</div>
        <div>TWITTE: {props.profile.contacts.twitter}</div>
        <div>YOUTUBE: {props.profile.contacts.youtube}</div>
      </div>
    </div>
  )


}
)


export default ProfileInfo;