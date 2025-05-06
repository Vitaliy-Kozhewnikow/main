import React from 'react';
// @ts-ignore
import a from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import {ProfileInfoType} from "../../../redux/profileReducer";

const userPhoto = require('../../../images/defaultAva.jpg');

type PropsType = {
    profile: ProfileInfoType
    savePhoto: () => void
    owner: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = React.memo(({profile, savePhoto, owner, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
      if (e.target.files) {
          savePhoto(e.target.files[0]);
      }
  }
  const profilePhotoLarge = typeof profile.photos.large ==='string'
      ? profile.photos.large
      : userPhoto;
  const profilePhotoSmall = typeof profile.photos.small ==='string'
      ? profile.photos.small
      : null;


  return (
    <div>
      <div>

        <img src={profilePhotoLarge}></img>
      </div>
      <div className={a.discript}>
        <img src={profilePhotoSmall}></img>
      </div>
        <div className={a.inputFile}>
            {owner && <input type="file" onChange={onMainPhotoSelected} />}
        </div>
      <div>
        <ProfileStatus status={status} updateStatus={updateStatus}/>
      </div>
      <div>
        Contacts : 
        <div>VK: {profile.contacts.vk}</div>
        <div>FACEBOOK: {profile.contacts.facebook}</div>
        <div>GITHUB: {profile.contacts.github}</div>
        <div>TWITTER: {profile.contacts.twitter}</div>
        <div>YOUTUBE: {profile.contacts.youtube}</div>
      </div>
    </div>
  )


}
)


export default ProfileInfo;