import React from 'react';
import a from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../images/defaultAva.jpg'



const ProfileInfo = React.memo(props => {
  if (!props.profile) { 
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
      if (e.target.file[0].length) {
          props.savePhoto(e.target.file[0]);
      }
  }


  return (
    <div>
      <div>
        <img src={props.profile.photos.large || userPhoto}></img>
      </div>
      <div className={a.discript}>
        <img src={props.profile.photos.small}></img>
      </div>
        <div className={a.inputFile}>
            {props.owner && <input type="file" onChange={onMainPhotoSelected} />}
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